const clean = (str: string) => str.replace('/src/lib/content/images/', '');
const images = Object.entries(
	import.meta.glob('$lib/content/images/*', {
		eager: true,
		query: {
			enhanced: true
		}
	})
).reduce((acc, [path, image]) => ({ ...acc, [clean(path)]: image }), {} as { [path: string]: any });

export const getEnhancendImage = (imageFile: string) => images[imageFile]?.default;

const images2 = Object.entries(
	import.meta.glob('$lib/content/images/*', {
		eager: true,
		query: {
			enhanced: true
		}
	})
).reduce((acc, [path, image]) => ({ ...acc, [clean(path)]: image }), {} as { [path: string]: any });

export const getImageUrl = (imageFile: string) => images2[imageFile]?.default.img.src;
