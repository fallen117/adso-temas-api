import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemasModule } from './temas/temas.module';
import { Tema } from './temas/entities/tema.entity';
import { AprendizModule } from './aprendiz/aprendiz.module';
import { Aprendiz } from './aprendiz/entities/aprendiz.entity';

@Module({
  imports: [
    // ── 1. Variables de entorno ──────────────────────────────────────────
    ConfigModule.forRoot({
      isGlobal: true,   // disponible en toda la app sin re-importar
      envFilePath: '.env',
    }),

    // ── 2. TypeORM + PostgreSQL (Supabase) ───────────────────────────────
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        database: config.get<string>('DB_NAME'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        schema: config.get<string>('DB_SCHEMA'),   // esquema "sena"
        entities: [Tema, Aprendiz],
        synchronize: false,   // ⚠️ false en prod — la tabla ya existe
        ssl: { rejectUnauthorized: false }, // requerido por Supabase pooler
        logging: config.get('NODE_ENV') === 'development',
      }),
    }),

    // ── 3. Módulos de la app ─────────────────────────────────────────────
    TemasModule,
    AprendizModule,
  ],
})
export class AppModule {}
