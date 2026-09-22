from django.db import models
from wagtail.admin.panels import FieldPanel
from wagtail.contrib.settings.models import BaseGenericSetting, register_setting
from wagtail.snippets.models import register_snippet


@register_setting
class SiteSettings(BaseGenericSetting):
    name = models.CharField(max_length=80, default="GrowPlus+")
    phone = models.CharField(max_length=80, default="+91 – 9671718434")
    email = models.EmailField(default="Info@growplused.com")
    website = models.CharField(max_length=120, default="growplused.com")
    location = models.CharField(max_length=160, default="Faridabad, Haryana, India")
    tagline = models.TextField(default="India's most results-obsessed digital marketing agency.")

    panels = [
        FieldPanel("name"),
        FieldPanel("phone"),
        FieldPanel("email"),
        FieldPanel("website"),
        FieldPanel("location"),
        FieldPanel("tagline"),
    ]


@register_snippet
class Service(models.Model):
    slug = models.SlugField(unique=True)
    number = models.CharField(max_length=8)
    icon = models.CharField(max_length=16)
    title = models.CharField(max_length=160)
    short = models.CharField(max_length=80)
    summary = models.TextField()
    description = models.TextField()
    tags = models.TextField(help_text="Comma-separated tags")
    result_value = models.CharField(max_length=40)
    result_label = models.TextField()
    sort_order = models.PositiveIntegerField(default=0)

    panels = [
        FieldPanel("slug"),
        FieldPanel("number"),
        FieldPanel("icon"),
        FieldPanel("title"),
        FieldPanel("short"),
        FieldPanel("summary"),
        FieldPanel("description"),
        FieldPanel("tags"),
        FieldPanel("result_value"),
        FieldPanel("result_label"),
        FieldPanel("sort_order"),
    ]

    class Meta:
        ordering = ["sort_order"]

    def __str__(self):
        return self.title


@register_snippet
class BlogPost(models.Model):
    slug = models.SlugField(unique=True)
    cat = models.CharField(max_length=40)
    category = models.CharField(max_length=80)
    icon = models.CharField(max_length=16)
    thumb = models.CharField(max_length=16, default="bt1")
    featured = models.BooleanField(default=False)
    title = models.CharField(max_length=220)
    excerpt = models.TextField()
    body = models.TextField()
    author = models.CharField(max_length=80)
    date = models.CharField(max_length=40)
    read = models.CharField(max_length=40)

    panels = [
        FieldPanel("slug"),
        FieldPanel("cat"),
        FieldPanel("category"),
        FieldPanel("icon"),
        FieldPanel("thumb"),
        FieldPanel("featured"),
        FieldPanel("title"),
        FieldPanel("excerpt"),
        FieldPanel("body"),
        FieldPanel("author"),
        FieldPanel("date"),
        FieldPanel("read"),
    ]

    def __str__(self):
        return self.title


@register_snippet
class Update(models.Model):
    slug = models.SlugField(unique=True)
    icon = models.CharField(max_length=16)
    cat = models.CharField(max_length=80)
    thumb = models.CharField(max_length=16, default="uth1")
    title = models.CharField(max_length=220)
    excerpt = models.TextField()
    date = models.CharField(max_length=40)

    panels = [FieldPanel("slug"), FieldPanel("icon"), FieldPanel("cat"), FieldPanel("thumb"), FieldPanel("title"), FieldPanel("excerpt"), FieldPanel("date")]

    def __str__(self):
        return self.title


@register_snippet
class FAQ(models.Model):
    question = models.CharField(max_length=240)
    answer = models.TextField()
    group = models.CharField(max_length=40, default="home")
    sort_order = models.PositiveIntegerField(default=0)

    panels = [FieldPanel("question"), FieldPanel("answer"), FieldPanel("group"), FieldPanel("sort_order")]

    class Meta:
        ordering = ["sort_order"]

    def __str__(self):
        return self.question


@register_snippet
class TeamMember(models.Model):
    initial = models.CharField(max_length=4)
    name = models.CharField(max_length=80)
    role = models.CharField(max_length=80)
    bio = models.TextField()
    sort_order = models.PositiveIntegerField(default=0)

    panels = [FieldPanel("initial"), FieldPanel("name"), FieldPanel("role"), FieldPanel("bio"), FieldPanel("sort_order")]

    def __str__(self):
        return self.name


@register_snippet
class CaseStudy(models.Model):
    emoji = models.CharField(max_length=8)
    brand = models.CharField(max_length=160)
    title = models.CharField(max_length=220)
    body = models.TextField()
    metrics_json = models.JSONField(default=list)
    sort_order = models.PositiveIntegerField(default=0)

    panels = [FieldPanel("emoji"), FieldPanel("brand"), FieldPanel("title"), FieldPanel("body"), FieldPanel("metrics_json"), FieldPanel("sort_order")]

    def __str__(self):
        return self.title


@register_snippet
class Testimonial(models.Model):
    quote = models.TextField()
    initial = models.CharField(max_length=4)
    name = models.CharField(max_length=80)
    role = models.CharField(max_length=120)
    sort_order = models.PositiveIntegerField(default=0)

    panels = [FieldPanel("quote"), FieldPanel("initial"), FieldPanel("name"), FieldPanel("role"), FieldPanel("sort_order")]

    def __str__(self):
        return self.name


@register_snippet
class Tool(models.Model):
    icon = models.CharField(max_length=8)
    name = models.CharField(max_length=80)
    desc = models.CharField(max_length=160)
    sort_order = models.PositiveIntegerField(default=0)

    panels = [FieldPanel("icon"), FieldPanel("name"), FieldPanel("desc"), FieldPanel("sort_order")]

    def __str__(self):
        return self.name


@register_snippet
class Award(models.Model):
    icon = models.CharField(max_length=8)
    title = models.CharField(max_length=160)
    org = models.CharField(max_length=160)
    year = models.CharField(max_length=20)
    sort_order = models.PositiveIntegerField(default=0)

    panels = [FieldPanel("icon"), FieldPanel("title"), FieldPanel("org"), FieldPanel("year"), FieldPanel("sort_order")]

    def __str__(self):
        return self.title


@register_snippet
class Partner(models.Model):
    name = models.CharField(max_length=80)
    sort_order = models.PositiveIntegerField(default=0)

    panels = [FieldPanel("name"), FieldPanel("sort_order")]

    def __str__(self):
        return self.name


@register_snippet
class WhyPoint(models.Model):
    num = models.CharField(max_length=8)
    title = models.CharField(max_length=160)
    body = models.TextField()
    sort_order = models.PositiveIntegerField(default=0)

    panels = [FieldPanel("num"), FieldPanel("title"), FieldPanel("body"), FieldPanel("sort_order")]

    def __str__(self):
        return self.title


@register_snippet
class ProcessStep(models.Model):
    num = models.CharField(max_length=8)
    title = models.CharField(max_length=160)
    body = models.TextField()
    sort_order = models.PositiveIntegerField(default=0)

    panels = [FieldPanel("num"), FieldPanel("title"), FieldPanel("body"), FieldPanel("sort_order")]

    def __str__(self):
        return self.title


class Lead(models.Model):
    first_name = models.CharField(max_length=80, blank=True)
    last_name = models.CharField(max_length=80, blank=True)
    email = models.EmailField()
    phone = models.CharField(max_length=40, blank=True)
    company = models.CharField(max_length=120, blank=True)
    service = models.CharField(max_length=160, blank=True)
    budget = models.CharField(max_length=80, blank=True)
    message = models.TextField(blank=True)
    source = models.CharField(max_length=40, default="contact")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.email} ({self.source})"


class NewsletterSubscriber(models.Model):
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email
