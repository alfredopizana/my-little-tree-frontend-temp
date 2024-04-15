// The following function is shared
// with getStaticProps and API routes
// from a `lib/` directory
export async function loadPosts() {
    // Call an external API endpoint to get posts
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/plants/`)
    const data = await res.json()

    return data
  }