from wagtail.snippets.views.snippets import SnippetViewSet, SnippetViewSetGroup
from wagtail.snippets.models import register_snippet

from .models import Lead, NewsletterSubscriber


class LeadViewSet(SnippetViewSet):
    model = Lead
    icon = "mail"
    list_display = ["email", "service", "source", "created_at"]
    inspect_view_enabled = True


class NewsletterViewSet(SnippetViewSet):
    model = NewsletterSubscriber
    icon = "user"
    list_display = ["email", "created_at"]


class InboxGroup(SnippetViewSetGroup):
    menu_label = "Inbox"
    menu_icon = "form"
    items = (LeadViewSet, NewsletterViewSet)


register_snippet(InboxGroup)
