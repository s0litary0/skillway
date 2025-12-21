from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Task, Submission, Enrollment
from .serializers import SubmissionSerializer
from django.contrib.auth.models import User
from apps.accounts.models import UserStats


class SubmitMCQAPIView(APIView):
    def post(self, request, task_id, *args, **kwargs):
        user_id = request.data.get("user_id")
        answer = request.data.get("answer")

        if not user_id or not answer:
            return Response(
                {"detail": "Both user_id and answer are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        try:
            task = Task.objects.get(id=task_id)
        except Task.DoesNotExist:
            return Response({"detail": "Task not found"}, status=status.HTTP_404_NOT_FOUND)

        # Check if user already submitted
        submission_qs = Submission.objects.filter(user=user, task=task)
        if submission_qs.exists():
            latest_submission = submission_qs.first()
            if latest_submission.is_correct:
                return Response(
                    {"detail": "You already submitted the correct answer. Cannot resubmit."},
                    status=status.HTTP_400_BAD_REQUEST
                )
            else:
                # Overwrite previous incorrect submission
                submission = latest_submission
        else:
            submission = Submission(user=user, task=task)

        # Check correctness if task has MCQ
        if hasattr(task, "mcq") and task.mcq:
            submission.is_correct = (answer == task.mcq.correct_option)
        else:
            submission.is_correct = False  # default if no MCQ

        submission.answer = answer
        submission.save()

        try:
            print(user.id, task.lesson.course.id)
            enrollment = Enrollment.objects.get(user=user, course=task.lesson.course)
            total_tasks = Task.objects.filter(lesson__course=task.lesson.course).count()
            completed_tasks = Submission.objects.filter(
                user=user, task__lesson__course=task.lesson.course, is_correct=True
            ).count()

            enrollment.progress = (completed_tasks / total_tasks) * 100  # as percentage
            if enrollment.progress >= 100:
                stats, _ = UserStats.objects.get_or_create(user=user)
                stats.courses_completed += 1
                if stats.courses_in_progress > 0:
                    stats.courses_in_progress -= 1
                stats.save()
            enrollment.save()
        except Enrollment.DoesNotExist:
            print("No enrollment")

        serializer = SubmissionSerializer(submission)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
