from django.db import models
from django.contrib.auth.models import User


class Genre(models.Model):
    name = models.CharField(max_length=50)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name


class Movie(models.Model):
    CATEGORY_CHOICES = [
        ('popular', 'محبوب ترین ها'),
        ('top_rated', 'پرفروش ها'),
        ('now_playing', 'بیشترین دانلود'),
        ('fantasy', 'ویژه ها / فانتزی'),
        ('action', 'اکشن'),
        ('comedy', 'کمدی'),
        ('horror', 'ترسناک'),
        ('sci-fi', 'علمی-تخیلی'),
        ('crime', 'جنایی'),
        ('adventure', 'ماجراجویی'),
    ]

    title = models.CharField(max_length=255)
    original_title = models.CharField(max_length=255, blank=True, null=True)

    tagline = models.CharField(max_length=255, blank=True, null=True)
    overview = models.TextField(blank=True, null=True)
    release_date = models.DateField(blank=True, null=True)
    runtime = models.IntegerField(default=120, help_text="مدت زمان به دقیقه")
    vote_average = models.FloatField(default=0.0)
    vote_count = models.IntegerField(default=0)

    # تغییر یافته به CharField برای ذخیره مستقیم لینک‌های دریافتی از API
    poster_path = models.CharField(max_length=255, blank=True, null=True)
    backdrop_path = models.CharField(max_length=255, blank=True, null=True)

    trailer_key = models.CharField(max_length=100, blank=True, null=True, help_text="شناسه یوتیوب برای تریلر")

    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='popular')
    genres = models.ManyToManyField(Genre, related_name='movies', blank=True)
    director = models.CharField(max_length=100, blank=True, null=True)
    writer = models.CharField(max_length=100, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class CastMember(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='cast_members')
    name = models.CharField(max_length=100)
    character = models.CharField(max_length=100)
    profile_image = models.ImageField(upload_to='cast/', blank=True, null=True)

    def __str__(self):
        return f"{self.name} - {self.character}"


class Comment(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='comments')
    email = models.EmailField()
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Comment by {self.email} on {self.movie.title}"