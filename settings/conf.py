from decouple import config


SECRET_KEY = config("SKILLWAY_SECRET_KEY", cast=str)
ENV_ID = config("SKILLWAY_ENV_ID", cast=str)