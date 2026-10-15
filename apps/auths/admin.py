from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
from django.contrib.auth.forms import AdminUserCreationForm, UserChangeForm

from apps.auths.models import User
# Register your models here.
class UserCreateform(AdminUserCreationForm):
    class Meta:
        model = User
        fields = ["email"]

    def clean_email(self) -> str:
        return self.cleaned_data["email"].lower()

class UserEditForm(UserChangeForm):
    class Meta:
        model = User
        fields = "__all__"
    def clean_email(self) -> str:
        return self.cleaned_data["email"].lower()

@admin.register(User)
class UserAdmin(DjangoUserAdmin):

    form = UserEditForm
    add_form = UserCreateform

    list_display = ["id", "email", "first_name", "last_name", "is_staff", "is_active", "created_at", "deleted_at"]
    list_display_links = ["id", "email"]
    list_filter = ["is_staff", "is_superuser", "is_active"]
    search_fields = ["email", "first_name", "last_name", ]
    ordering = ["-created_at"]
    readonly_fields = ["last_login", "created_at", "deleted_at"]

    fieldsets = [
        ("General", {"fields": ["email", "password"]}),
        ("Profile", {"fields": ["first_name", "last_name"]}),
        ("Permissions", {"fields": ["is_active", "is_staff", "is_superuser", "groups", "user_permissions"]}),
        ("Timestamps", {"fields": ["last_login", "created_at", "deleted_at"]}),

    ]

    add_fieldsets = [
        ("General", {"fields": ["email", "usable_password", "password1", "password2"]}),    ]