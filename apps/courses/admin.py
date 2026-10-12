from django.contrib import admin
from apps.courses.models import Category, Course, Review
# Register your models here.

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "created_at", "deleted_at"]
    search_fields = ["name"]

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "author", "created_at", "deleted_at"]
    list_filter = ["categories"]
    search_fields = ["name", "description"]
    filter_horizontal = ["categories"]

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ["id", "course", "author", "rating", "created_at", "deleted_at"]
    list_filter = ["rating"]
    search_fields = ["comment"]

