from collections.abc import Iterable
from typing import Any

from django.contrib.admin import SimpleListFilter
from django.db.models import QuerySet


class IsDeletedFilter(SimpleListFilter):
    title = "Is deleted"
    parameter_name = "is_deleted"

    DELETED_KEY = "deleted"
    NOTDELETED_KEY = "not-deleted"


    def lookups(self, request: Any, model_admin: Any) -> Iterable[tuple[str, str]]: # type: ignore
        return [
            (self.DELETED_KEY, "Deleted"),
            (self.NOTDELETED_KEY, "Not Deleted")
        ]

    def queryset(self, request: Any, queryset: QuerySet[Any, Any]) -> QuerySet[Any, Any] | None:
        if self.value() == self.DELETED_KEY:
            return queryset.filter(deleted_at__isnull=False)
        if self.value() == self.NOTDELETED_KEY:
            return queryset.filter(deleted_at__isnull=True)
        return queryset.all()