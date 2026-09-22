from django.core.management.base import BaseCommand

from website.models import (
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


class Command(BaseCommand):
    help = "Load GrowPlus+ website content into the CMS"

    def handle(self, *args, **options):
        settings = SiteSettings.load()
        settings.name = "GrowPlus+"
        settings.phone = "+91 – 9671718434"
        settings.email = "Info@growplused.com"
        settings.website = "growplused.com"
        settings.location = "Faridabad, Haryana, India"
        settings.tagline = "India's most results-obsessed digital marketing agency."
        settings.save()

        services = [
            ("seo", "01", "🔍", "Search Engine Optimization", "SEO", "Rank higher. Stay there. We build lasting organic authority through technical mastery and content excellence.", "Rank #1 on Google and stay there. We build lasting organic authority through technical excellence, content mastery, and strategic link building that compounds over time.", "Technical SEO, On-Page Optimization, Link Building, Local SEO, E-commerce SEO, Keyword Research", "+312%", "Average organic traffic increase in 12 months across our SEO clients"),
            ("performance", "02", "⚡", "Performance Marketing", "Performance Marketing", "Every rupee accountable. Precision-targeted paid campaigns engineered for maximum ROAS across every platform.", "Every rupee accountable. Precision-targeted paid campaigns engineered for maximum ROAS across Google, Meta, LinkedIn and beyond.", "Google Ads, Meta Ads, LinkedIn Ads, YouTube Ads, Retargeting, Shopping Ads", "6.2×", "Average ROAS achieved across our performance marketing clients"),
            ("social", "03", "📱", "Social Media Marketing", "Social Media", "Platform-native strategies that build genuine communities and convert followers into loyal customers.", "Build communities. Dominate feeds. Convert followers into customers across Instagram, LinkedIn, YouTube, and beyond.", "Instagram, LinkedIn, YouTube, Twitter/X, Reels & Shorts, Community Building", "+280%", "Average follower growth in first 6 months for our social media clients"),
            ("affiliate", "04", "🔗", "Affiliate Marketing", "Affiliate Marketing", "Build a performance revenue channel where publishers only earn when you do.", "Build a performance-based revenue channel through our network of 5,000+ verified publishers.", "Publisher Recruitment, Commission Design, Tracking Setup, Fraud Prevention, Performance Analytics", "0 upfront", "Media cost — you only pay when a sale or lead is delivered by our publishers"),
            ("brand", "05", "🌐", "Brand Marketing", "Brand Marketing", "Craft an identity so powerful your audience chooses you before they compare prices.", "Build a brand so powerful that customers choose you before they even compare options.", "Brand Strategy, Visual Identity, Brand Voice, ORM, PR & Media, Brand Positioning", "3×", "Average price premium clients achieve after a GrowPlus+ brand repositioning"),
            ("influencer", "06", "🤝", "Influencer Marketing", "Influencer Marketing", "Authentic partnerships with vetted creators across nano, micro and macro tiers.", "We identify, vet, and manage creator partnerships across nano, micro and macro tiers.", "Nano Influencers, Micro Influencers, Macro Influencers, UGC Campaigns, Brand Ambassadors", "4.8×", "Average ROI across 200+ influencer campaigns managed by GrowPlus+"),
            ("content", "07", "✍️", "Content Marketing", "Content Marketing", "Content that ranks, educates, and converts your ideal customer.", "SEO-optimized long-form to viral short-form — content your audience actually wants to consume.", "Blog Articles, Video Scripts, Social Content, Newsletters, Whitepapers, Case Studies", "10M+", "Impressions generated through content campaigns for our clients in 2024"),
        ]
        for i, row in enumerate(services):
            Service.objects.update_or_create(
                slug=row[0],
                defaults={
                    "number": row[1],
                    "icon": row[2],
                    "title": row[3],
                    "short": row[4],
                    "summary": row[5],
                    "description": row[6],
                    "tags": row[7],
                    "result_value": row[8],
                    "result_label": row[9],
                    "sort_order": i,
                },
            )

        faqs = [
            ("home", "How long before we see results?", "For SEO, expect meaningful movement in 3–4 months, compounding from month 6+. Paid campaigns typically show ROI improvements within 30–45 days."),
            ("home", "What's the minimum budget to work with GrowPlus+?", "Our retainer packages start from ₹25,000/month for single-service engagements. Full-funnel growth packages range from ₹1–5 lakhs per month."),
            ("home", "Do you work with startups or only established brands?", "We work with both. About 40% of our clients are startups, and 60% are established brands."),
            ("home", "What makes you different from a freelancer?", "You get a dedicated team — strategist, creative lead, media buyer, SEO specialist, and account manager."),
            ("home", "How do you measure and report results?", "Every client gets a real-time Looker Studio dashboard, weekly summaries, and monthly strategy calls."),
            ("home", "Can we start with just one service?", "Absolutely. Many clients begin with SEO or Performance Marketing, then expand as they see results."),
            ("contact", "How quickly can you launch a campaign?", "We typically launch campaigns within 48 hours of receiving all required assets and approvals."),
            ("contact", "Do you offer month-to-month contracts?", "Yes. All services are available on flexible monthly arrangements. No lock-in, no hidden fees."),
            ("contact", "What information do you need to get started?", "Fill out the form. We'll schedule a free discovery call and send a custom proposal within 48 hours."),
            ("contact", "Do you work with international brands?", "Yes. We work with brands across South Asia, Southeast Asia, the Middle East, and the UK."),
        ]
        FAQ.objects.all().delete()
        for i, (group, q, a) in enumerate(faqs):
            FAQ.objects.create(group=group, question=q, answer=a, sort_order=i)

        TeamMember.objects.all().delete()
        TeamMember.objects.create(initial="A", name="Aarav Sharma", role="Founder & CEO", bio="10 years of digital marketing expertise. Former growth head at two unicorn startups.", sort_order=0)
        TeamMember.objects.create(initial="P", name="Priya Mehta", role="Head of Performance", bio="Managed ₹20Cr+ in ad spend. Specialist in multi-channel campaign optimization.", sort_order=1)
        TeamMember.objects.create(initial="R", name="Rohan Gupta", role="SEO Director", bio="100+ websites ranked #1 on Google. Google-certified with 8 years of SEO mastery.", sort_order=2)

        CaseStudy.objects.all().delete()
        CaseStudy.objects.create(emoji="🛒", brand="E-commerce · SEO + Performance", title="How FreshCart Grew Organic Revenue by 400% in 10 Months", body="We rebuilt their entire digital presence — from technical architecture to content and paid acquisition.", metrics_json=[{"value": "+400%", "label": "Organic Revenue"}, {"value": "6.2×", "label": "ROAS"}, {"value": "-41%", "label": "CPA Drop"}], sort_order=0)
        CaseStudy.objects.create(emoji="👗", brand="D2C Fashion · Influencer + Social", title="StyleHive's ₹1.2Cr Launch Month Through Influencer Strategy", body="We curated 80 micro-influencers and created a 3-week hype campaign that exceeded every projection.", metrics_json=[{"value": "₹1.2Cr", "label": "Month 1 Revenue"}, {"value": "80+", "label": "Influencers"}, {"value": "4.8M", "label": "Impressions"}], sort_order=1)

        Testimonial.objects.all().delete()
        Testimonial.objects.create(quote="GrowPlus+ 10x'd our organic traffic in 8 months. They build growth machines, not just campaigns.", initial="S", name="Sanjay Patel", role="CEO, FreshCart India", sort_order=0)
        Testimonial.objects.create(quote="Our ROAS went from 1.8× to 6.2× in 3 months. The performance team at GrowPlus+ is on another level.", initial="N", name="Neha Kapoor", role="Founder, StyleHive", sort_order=1)
        Testimonial.objects.create(quote="The influencer campaign generated ₹1.2Cr in sales in 2 weeks. Their network and execution are unmatched.", initial="A", name="Arjun Singh", role="CMO, BrewLab", sort_order=2)

        Tool.objects.all().delete()
        for i, (icon, name, desc) in enumerate([
            ("📊", "Google Analytics 4", "Deep conversion tracking & attribution"),
            ("🔍", "SEMrush", "Keyword research & competitor analysis"),
            ("⚡", "Google Ads", "Search, display & YouTube campaigns"),
            ("📘", "Meta Ads Manager", "Facebook & Instagram performance ads"),
            ("🤖", "AI Creative Suite", "Proprietary AI-powered ad creation"),
            ("📈", "Looker Studio", "Real-time reporting dashboards"),
            ("🔗", "Ahrefs", "Backlink analysis & SEO audits"),
            ("🎯", "HubSpot CRM", "Lead tracking & nurture automation"),
        ]):
            Tool.objects.create(icon=icon, name=name, desc=desc, sort_order=i)

        Partner.objects.all().delete()
        for i, name in enumerate(["FreshCart", "StyleHive", "BrewLab", "Atelier Studio", "NexGen Tech", "Urban Roots", "PureForm", "Quantum Labs"]):
            Partner.objects.create(name=name, sort_order=i)

        Award.objects.all().delete()
        Award.objects.create(icon="🏆", title="Top Digital Agency — North India", org="Digital Agency Network", year="2025", sort_order=0)
        Award.objects.create(icon="⭐", title="Best Performance Marketing Agency", org="Marketing Excellence Awards", year="2024", sort_order=1)
        Award.objects.create(icon="🥇", title="Google Premier Partner", org="Google India", year="2023–25", sort_order=2)
        Award.objects.create(icon="🎖️", title="Top 50 Growth Agencies", org="India Inc.", year="2024", sort_order=3)

        WhyPoint.objects.all().delete()
        for i, (num, title, body) in enumerate([
            ("01", "Performance Guarantees", "We back our work with real commitments. If targets aren't met, we work at reduced rates until they are."),
            ("02", "Proprietary SCALE™ Framework", "Refined across 500+ campaigns over 5 years, our methodology consistently delivers 3× faster results."),
            ("03", "Real-Time Transparency", "Live dashboards. Zero black-box reporting. You see exactly where every rupee goes."),
            ("04", "AI-Augmented Strategy", "We leverage AI for audience targeting, creative testing, and predictive analytics."),
            ("05", "Senior Talent Only", "You get a dedicated senior strategist, creative lead, and account manager — not rotating junior staff."),
            ("06", "Integrated Omnichannel", "SEO, paid, social, content, and influencer — orchestrated for compound results."),
        ]):
            WhyPoint.objects.create(num=num, title=title, body=body, sort_order=i)

        ProcessStep.objects.all().delete()
        for i, (num, title, body) in enumerate([
            ("01", "Discovery Call", "We deep-dive into your brand, goals, competition, and current digital footprint."),
            ("02", "Free Growth Audit", "Comprehensive analysis with actionable gap identification and opportunity mapping."),
            ("03", "Custom Strategy", "Your bespoke growth plan across the channels that matter most."),
            ("04", "Launch in 48hrs", "Campaign go-live within 48 hours. No long onboarding delays."),
            ("05", "Optimize & Scale", "Continuous testing, learning, and scaling to compound results."),
        ]):
            ProcessStep.objects.create(num=num, title=title, body=body, sort_order=i)

        posts = [
            ("google-core-update-2025", "seo", "SEO Strategy", "📈", "bt1", True, "Google's March 2025 Core Update: The Complete Brand Playbook", "Google's biggest algorithm shift in two years has reshuffled rankings across virtually every industry.", "Rohan Gupta", "March 18, 2025", "12 min read", "Recover by fixing crawl waste, strengthening entity signals, and rebuilding topical clusters around revenue pages."),
            ("d2c-roas-90-days", "performance", "Performance Marketing", "⚡", "bt2", False, "How We Achieved 6.2× ROAS for a D2C Brand in 90 Days", "A step-by-step breakdown of the campaign structure and creative testing framework.", "Priya Mehta", "Mar 10, 2025", "8 min read", "Creative velocity and weekly kill/scale rules beat over-segmented audiences."),
            ("technical-seo-2025", "seo", "SEO", "🔍", "bt3", False, "Technical SEO in 2025: The 15 Factors That Actually Move Rankings", "Core Web Vitals, crawl budget, entity optimization, and AI overviews.", "Rohan Gupta", "Feb 28, 2025", "11 min read", "Indexation quality and internal linking now matter more than keyword density."),
            ("micro-influencers", "influencer", "Influencer Marketing", "🤝", "bt4", False, "Why 80 Micro-Influencers Outperformed One Celebrity for Our Client", "We split-tested a celebrity campaign against a micro-influencer network.", "Aarav Sharma", "Feb 14, 2025", "7 min read", "Micro-creators produced higher conversion rates and reusable UGC."),
            ("instagram-algorithm-2025", "social", "Social Media", "📱", "bt5", False, "Instagram Algorithm 2025: What's Changed and How to Win", "Instagram has overhauled its content distribution model.", "Priya Mehta", "Feb 5, 2025", "9 min read", "Originality, watch time, and conversation beat posting frequency."),
            ("content-funnel-10m", "content", "Content Marketing", "✍️", "bt6", False, "The Content Funnel That Generated 10M Impressions and ₹2Cr in Pipeline", "A full-funnel content system for a B2B SaaS brand.", "Aarav Sharma", "Jan 22, 2025", "13 min read", "Map content to jobs-to-be-done, then distribute the same idea in search, LinkedIn, and email."),
        ]
        for slug, cat, category, icon, thumb, featured, title, excerpt, author, date, read, body in posts:
            BlogPost.objects.update_or_create(
                slug=slug,
                defaults={"cat": cat, "category": category, "icon": icon, "thumb": thumb, "featured": featured, "title": title, "excerpt": excerpt, "author": author, "date": date, "read": read, "body": body},
            )

        updates = [
            ("core-update-rankings", "📈", "SEO", "uth1", "Google's Core Update 2025: What It Means for Your Rankings", "Here's exactly what changed, who's affected, and what to do right now.", "March 2025"),
            ("ai-ad-performance", "🤖", "AI Marketing", "uth2", "How We Used AI to 3× a Client's Ad Performance in 30 Days", "A behind-the-scenes look at AI-powered creative optimization.", "February 2025"),
            ("top-agency-north-india", "🏆", "Agency News", "uth3", "GrowPlus+ Named Top Digital Agency in North India 2025", "Recognized by Digital Agency Network for the second year running.", "January 2025"),
            ("instagram-threads", "📱", "Social Media", "uth1", "Instagram Threads: The Untapped Growth Channel for Brands in 2025", "Why Threads is becoming a high-ROI social platform.", "January 2025"),
            ("content-playbook-10m", "✍️", "Content Strategy", "uth2", "The Content Playbook That Generated 10M Impressions", "From ideation to distribution for a fintech startup.", "December 2024"),
            ("micro-vs-celebrity", "🤝", "Influencer Marketing", "uth3", "Why Micro-Influencers Outperform Celebrities for D2C Brands", "Data from 50 influencer campaigns.", "December 2024"),
        ]
        for slug, icon, cat, thumb, title, excerpt, date in updates:
            Update.objects.update_or_create(slug=slug, defaults={"icon": icon, "cat": cat, "thumb": thumb, "title": title, "excerpt": excerpt, "date": date})

        self.stdout.write(self.style.SUCCESS("Seeded GrowPlus+ CMS content."))
