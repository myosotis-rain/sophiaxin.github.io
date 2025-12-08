export const getThumbnail = (mediaArray) => {
    if (!mediaArray || mediaArray.length === 0) return '';
    
    // 1. Try to find an explicit Image first
    const imgItem = mediaArray.find(m => m.type === 'image');
    if (imgItem) return imgItem.src;

    // 2. Try to find an Interactive Slides thumbnail
    const slidesItem = mediaArray.find(m => m.type === 'interactive-slides');
    if (slidesItem && slidesItem.thumbnail) {
        return slidesItem.thumbnail;
    }

    // 3. Try to find a Video thumbnail (explicit or constructed)
    const vidItem = mediaArray.find(m => m.type === 'video');
    if (vidItem) {
        if (vidItem.thumbnail) { // Use explicit thumbnail from JSON if available
            return vidItem.thumbnail;
        }
        if (vidItem.src.includes('youtube')) { // Fallback to constructing YouTube thumbnail
            const parts = vidItem.src.split('/');
            const videoId = parts[parts.length - 1].split('?')[0];
            return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        }
    }
    
    return ''; // Truly no media found
};

export const sortProjects = (projects) => {
    return projects.sort((a, b) => {
        // Helper to extract year numbers from strings like "2024" or "2020-2024"
        const getYear = (p) => {
            const yearMeta = p.meta.find(m => m.label === 'Year' || m.label === 'Period');
            if (!yearMeta) return 0;
            const matches = yearMeta.value.match(/\d{4}/g);
            return matches ? Math.max(...matches.map(Number)) : 0;
        };
        return getYear(b) - getYear(a); // Descending order
    });
};