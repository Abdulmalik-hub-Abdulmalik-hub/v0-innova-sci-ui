import Link from "next/link"
import { ArrowRight, Calendar, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

// Blog posts data
const posts = [
  {
    id: 1,
    title: "How AI is Revolutionizing Drug Discovery",
    excerpt: "Explore how machine learning and AI are accelerating the pharmaceutical research pipeline by orders of magnitude.",
    author: "Dr. Sarah Chen",
    date: "Mar 15, 2024",
    readTime: "8 min read",
    category: "AI Research",
  },
  {
    id: 2,
    title: "Introduction to Hakeem: Your AI Research Assistant",
    excerpt: "Meet Hakeem, our intelligent AI assistant designed specifically for scientific research and literature review.",
    author: "James Rodriguez",
    date: "Mar 10, 2024",
    readTime: "5 min read",
    category: "Product",
  },
  {
    id: 3,
    title: "Best Practices for Managing Research Data",
    excerpt: "Learn how to organize, store, and analyze your research data effectively using modern tools and workflows.",
    author: "Dr. Emily Watson",
    date: "Mar 5, 2024",
    readTime: "6 min read",
    category: "Research Tips",
  },
  {
    id: 4,
    title: "The Future of Computational Chemistry",
    excerpt: "A deep dive into how quantum computing and AI are shaping the future of molecular simulations.",
    author: "Michael Park",
    date: "Feb 28, 2024",
    readTime: "10 min read",
    category: "Chemistry",
  },
  {
    id: 5,
    title: "Collaborative Research in the Age of AI",
    excerpt: "How teams around the world are using AI tools to collaborate more effectively on complex research projects.",
    author: "Dr. Sarah Chen",
    date: "Feb 20, 2024",
    readTime: "7 min read",
    category: "Collaboration",
  },
  {
    id: 6,
    title: "Understanding Natural Language Processing in Science",
    excerpt: "An overview of how NLP models are being used to extract insights from scientific literature.",
    author: "James Rodriguez",
    date: "Feb 15, 2024",
    readTime: "9 min read",
    category: "AI Research",
  },
]

// Categories
const categories = ["All", "AI Research", "Product", "Research Tips", "Chemistry", "Collaboration"]

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl text-balance">
              InnovaSci Blog
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Insights, tutorials, and updates from the InnovaSci team on AI, 
              research methodologies, and scientific innovation.
            </p>
          </div>

          {/* Categories */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                  category === "All"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
              >
                {/* Placeholder Image */}
                <div className="aspect-video rounded-lg bg-secondary" />
                
                {/* Category */}
                <div className="mt-4">
                  <span className="text-xs font-medium text-primary">
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <h2 className="mt-2 text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Read More */}
                <div className="mt-4">
                  <Link
                    href="#"
                    className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                  >
                    Read more
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">
              Load More Posts
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
