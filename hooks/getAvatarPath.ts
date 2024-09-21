
const botToken = process.env.BOT_TOKEN;

export async function getAvatarPath(userId: string): Promise<string | null> {
  
    if (!botToken) {
      console.error('Отсутствует BOT_TOKEN в .env.local');
      return null;
    }
  
    try {
      const profilePhotosResponse = await fetch(
        `https://api.telegram.org/bot${botToken}/getUserProfilePhotos?user_id=${userId}`
      );
      const profilePhotosData = await profilePhotosResponse.json();
  
      if (profilePhotosData.ok && profilePhotosData.result.total_count > 0) {
        const fileId = profilePhotosData.result.photos[0][0].file_id;
  
        const fileResponse = await fetch(
          `https://api.telegram.org/bot${botToken}/getFile?file_id=${fileId}`
        );
        const fileData = await fileResponse.json();
  
        if (fileData.ok) {
          const filePath = fileData.result.file_path;
          return `https://api.telegram.org/file/bot${botToken}/${filePath}`;
        }
      }
  
      console.log("Фотографии профиля не найдены");
      return null;
    } catch (error) {
      console.error("Ошибка при получении аватара:", error);
      return null;
    }
  }