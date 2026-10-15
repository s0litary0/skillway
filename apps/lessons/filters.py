from collections.abc import Iterable
from typing import Any

from django.contrib.admin import SimpleListFilter
from django.db.models import QuerySet


class OrderListFilter(SimpleListFilter):
    title = "Order"
    parameter_name = "order"

    ASCENDING_KEY = "ascending"
    DESCENDING_KEY = "descending"

    def lookups(self, request: Any, model_admin: Any) -> Iterable[tuple[str, str]]:
        return [
            (self.ASCENDING_KEY, "Ascending"),
            (self.DESCENDING_KEY, "Descending")
        ]

    def queryset(self, request: Any, queryset: QuerySet[Any, Any]) -> QuerySet[Any, Any] | None:
        if self.value() == self.ASCENDING_KEY:
            return queryset.order_by("order")
        if self.value() == self.DESCENDING_KEY:
            return queryset.order_by("-order")
        return queryset.all()