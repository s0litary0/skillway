from typing import Any

from django.db.models import (
    Model, 
    DateTimeField
)
from django.utils import timezone as django_timezone


class AbstractBaseModel(Model):
    """AbstractBaseModel with created_at and deleted_at fields"""

    created_at = DateTimeField(auto_now_add=True)
    deleted_at = DateTimeField(null=True, blank=True)

    class Meta: 
        """Meta class for AbstractBaseModel"""
        abstract = True

    def delete(self, *args: tuple[Any, ...], **kwargs: dict[Any, Any]) -> None:  # type: ignore
        self.deleted_at = django_timezone.now()
        self.save(update_fields=["deleted_at"])
    
