import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class GeminiService {
  private readonly logger = new Logger(GeminiService.name);

  constructor(private configService: ConfigService) {}

  async generarTips(nombreTema: string): Promise<object> {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY no configurada en .env');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash' });

    const prompt = `Eres un asistente educativo experto en pedagogía. Genera exactamente 3 tips de aprendizaje prácticos y útiles sobre el tema "${nombreTema}".
Cada tip debe tener un campo "tip" con el número como string ("1", "2", "3") y un campo "detalle" con una explicación clara y concisa.
Responde ÚNICAMENTE con un array JSON válido, sin texto adicional, sin bloques markdown, sin comillas invertidas, sin etiquetas de código.
Formato exacto:
[{"tip": "1", "detalle": "texto del primer tip"}, {"tip": "2", "detalle": "texto del segundo tip"}, {"tip": "3", "detalle": "texto del tercer tip"}]`;

    try {
      const result = await model.generateContent(prompt);
      const text = result.response.text();

      const jsonStr = this.extraerJson(text);
      const tips = JSON.parse(jsonStr);

      if (!Array.isArray(tips) || tips.length !== 3) {
        throw new Error('Respuesta de Gemini no contiene exactamente 3 tips');
      }

      return tips;
    } catch (error) {
      this.logger.error(`Error al generar tips para "${nombreTema}": ${error.message}`);
      throw error;
    }
  }

  private extraerJson(text: string): string {
    const match = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (match) {
      return match[1].trim();
    }
    return text.trim();
  }
}
