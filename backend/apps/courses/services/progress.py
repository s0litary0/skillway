from decimal import Decimal
from ..models import (
    Task,
    Submission,
    Enrollment,
)

def update_course_progress(user, course):
    enrollment = Enrollment.objects.get(
        user=user,
        course=course
    )

    # Total tasks in course
    total_tasks = Task.objects.filter(
        lesson__course=course
    ).count()

    if total_tasks == 0:
        enrollment.progress = Decimal("0.00")
        enrollment.save()
        return

    # Correct submissions by user
    correct_tasks = Submission.objects.filter(
        user=user,
        task__lesson__course=course,
        is_correct=True
    ).count()

    progress_percentage = (
        Decimal(correct_tasks) / Decimal(total_tasks)
    ) * Decimal(100)

    enrollment.progress = progress_percentage.quantize(
        Decimal("0.01")
    )
    enrollment.save()
