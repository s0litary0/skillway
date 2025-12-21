from django.db import transaction
from django.shortcuts import get_object_or_404

from ..models import (
    Task,
    Submission,
    MultipleChoiceQuestion,
)
from .progress import update_course_progress


@transaction.atomic
def submit_mcq(user, task_id, selected_option):
    """
    Rules:
    - User can submit only once
    - If correct, cannot resubmit
    - Progress is updated automatically
    """

    task = get_object_or_404(Task, id=task_id)

    # Ensure task is MCQ
    if not hasattr(task, "mcq"):
        raise ValueError("This task is not an MCQ")

    mcq: MultipleChoiceQuestion = task.mcq

    # 1. Prevent multiple submissions
    if Submission.objects.filter(user=user, task=task).exists():
        raise ValueError("Task already submitted")

    # 2. Check correctness
    is_correct = selected_option == mcq.correct_option

    # 3. Save submission
    Submission.objects.create(
        user=user,
        task=task,
        answer=selected_option,
        is_correct=is_correct,
    )

    # 4. Update course progress
    update_course_progress(
        user=user,
        course=task.lesson.course
    )

    return {
        "is_correct": is_correct,
        "correct_option": mcq.correct_option if not is_correct else None,
        "explanation": mcq.explanation if not is_correct else None,
    }
