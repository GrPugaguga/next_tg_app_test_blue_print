import { SignJWT } from 'jose';

// Проверяем наличие секретного ключа
if (!process.env.JWT_SECRET_KEY) {
  throw new Error('JWT_SECRET_KEY не установлен в переменных окружения');
}
const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

  const useJWT = async (id: string) => {
    
    try {
      const jwt = await new SignJWT({ id })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .sign(SECRET_KEY);
      
      return jwt;
    } catch (error) {
      console.error('Ошибка при создании JWT:', error);
      return null;
    }
  };

  export { useJWT };

