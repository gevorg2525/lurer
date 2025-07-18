export function extractPlainText(html: string, limit: number = 200): string {
    let text: string = html.replace(/<[^>]+>/g, "");

    text = text.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&");

    return text.trim().substring(0, limit);
}
