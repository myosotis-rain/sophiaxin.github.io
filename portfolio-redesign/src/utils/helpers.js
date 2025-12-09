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
        // Sort by explicit 'order' property if available
        const orderA = typeof a.order === 'number' ? a.order : 99;
        const orderB = typeof b.order === 'number' ? b.order : 99;
        return orderA - orderB;
    });
};