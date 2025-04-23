const fs = require('fs').promises;

async function deleteFileIfExists(filePath) {
    try {
        await fs.access(filePath);
        await fs.unlink(filePath);
        console.log(`File dihapus: ${filePath}`);
    } catch (err) {
        console.warn(`Gagal menghapus file (${filePath}):`, err.message);
    }
}

module.exports = {
    deleteFileIfExists,
};
