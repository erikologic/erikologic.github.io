import { base } from '$app/paths';

// TODO: types
export const load = async ({ fetch }) => {
	const res = await fetch(`${base}/api/posts/all`);
	const posts = await res.json();

	let uniqueCategories = {};

	posts.forEach((post) => {
		post.categories.forEach((category) => {
			if (uniqueCategories.hasOwnProperty(category)) {
				uniqueCategories[category].count += 1;
			} else {
				uniqueCategories[category] = {
					title: category,
					count: 1
				};
			}
		});
	});

	const sortedUniqueCategories = Object.values(uniqueCategories).sort((a, b) => a.title > b.title);

	return {
		uniqueCategories: sortedUniqueCategories
	};
};
