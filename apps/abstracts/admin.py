from django.contrib.admin import site


site.disable_action("delete_selected")
site.empty_value_display = "---"
