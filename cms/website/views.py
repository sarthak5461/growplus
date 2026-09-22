from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import (
    Award,
    BlogPost,
    CaseStudy,
    FAQ,
    Partner,
    ProcessStep,
    Service,
    SiteSettings,
    TeamMember,
    Testimonial,
    Tool,
    Update,
    WhyPoint,
)
from .models import NewsletterSubscriber
from .serializers import LeadSerializer, NewsletterSerializer


def faq_payload(group):
    return [{"q": item.question, "a": item.answer} for item in FAQ.objects.filter(group=group)]


@api_view(["GET"])
def content(request):
    settings = SiteSettings.load()
    return Response(
        {
            "site": {
                "name": settings.name,
                "phone": settings.phone,
                "email": settings.email,
                "website": settings.website,
                "location": settings.location,
                "tagline": settings.tagline,
            },
            "services": [
                {
                    "slug": s.slug,
                    "number": s.number,
                    "icon": s.icon,
                    "title": s.title,
                    "short": s.short,
                    "summary": s.summary,
                    "description": s.description,
                    "tags": [t.strip() for t in s.tags.split(",") if t.strip()],
                    "resultValue": s.result_value,
                    "resultLabel": s.result_label,
                }
                for s in Service.objects.all()
            ],
            "faqs": faq_payload("home"),
            "contactFaqs": faq_payload("contact"),
            "team": [
                {"initial": t.initial, "name": t.name, "role": t.role, "bio": t.bio}
                for t in TeamMember.objects.all().order_by("sort_order")
            ],
            "cases": [
                {"emoji": c.emoji, "brand": c.brand, "title": c.title, "body": c.body, "metrics": c.metrics_json}
                for c in CaseStudy.objects.all().order_by("sort_order")
            ],
            "testimonials": [
                {"quote": t.quote, "initial": t.initial, "name": t.name, "role": t.role}
                for t in Testimonial.objects.all().order_by("sort_order")
            ],
            "tools": [
                {"icon": t.icon, "name": t.name, "desc": t.desc}
                for t in Tool.objects.all().order_by("sort_order")
            ],
            "partners": [p.name for p in Partner.objects.all().order_by("sort_order")],
            "awards": [
                {"icon": a.icon, "title": a.title, "org": a.org, "year": a.year}
                for a in Award.objects.all().order_by("sort_order")
            ],
            "whyPoints": [
                {"num": w.num, "title": w.title, "body": w.body}
                for w in WhyPoint.objects.all().order_by("sort_order")
            ],
            "process": [
                {"num": p.num, "title": p.title, "body": p.body}
                for p in ProcessStep.objects.all().order_by("sort_order")
            ],
            "blogPosts": [
                {
                    "slug": p.slug,
                    "cat": p.cat,
                    "category": p.category,
                    "icon": p.icon,
                    "thumb": p.thumb,
                    "featured": p.featured,
                    "title": p.title,
                    "excerpt": p.excerpt,
                    "author": p.author,
                    "date": p.date,
                    "read": p.read,
                    "body": p.body,
                }
                for p in BlogPost.objects.all()
            ],
            "updates": [
                {
                    "slug": u.slug,
                    "icon": u.icon,
                    "cat": u.cat,
                    "thumb": u.thumb,
                    "title": u.title,
                    "excerpt": u.excerpt,
                    "date": u.date,
                }
                for u in Update.objects.all()
            ],
        }
    )


@api_view(["POST"])
def leads(request):
    serializer = LeadSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response({"ok": True})


@api_view(["POST"])
def newsletter(request):
    serializer = NewsletterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    NewsletterSubscriber.objects.get_or_create(email=serializer.validated_data["email"])
    return Response({"ok": True})
