export default function isValidImageUrl(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (!url) return resolve(false)

    try {
      new URL(url)
    } catch {
      return resolve(false)
    }

    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = url
  })
}
