import os

DEBUG = True
SITE_ID = 1

TEST_ROOT = os.path.normcase(os.path.dirname(os.path.abspath(__file__)))
FIXTURES_ROOT = os.path.join(TEST_ROOT, 'fixtures')


MEDIA_ROOT = os.path.join(os.path.normcase(os.path.dirname(TEST_ROOT)), 'media')
MEDIA_URL = '/media/'

STATIC_ROOT = os.path.join(os.path.normcase(os.path.dirname(TEST_ROOT)), 'static')
STATIC_URL = '/static/'


DATABASE_ENGINE = 'sqlite3'


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(TEST_ROOT, 'db.sqlite3'),
    }
}

INSTALLED_APPS = [
    'django.contrib.contenttypes',
    'django.contrib.sites',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.auth',
    'django.contrib.admin',

    'post_office',
    'subscribe_form',
    'tests',
]

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
)

# This is only needed for the 1.4.X test environment
USE_TZ = True

SECRET_KEY = 'easy'

ROOT_URLCONF = 'urls'


