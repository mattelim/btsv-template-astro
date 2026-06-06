import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
	const posts = await getCollection('posts', ({ data }) => !data.draft);

	return rss({
		title: 'btsv',
		description: 'A blog powered by btsv',
		site: context.site || 'https://example.com',
		items: posts
			.sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
			.map((post) => ({
				title: post.data.title,
				description: post.data.description || '',
				pubDate: post.data.date,
				link: `/${post.data.slug || post.id}/`
			})),
		customData: '<language>en</language>'
	});
}
