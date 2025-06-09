generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Usuario {
  id           String     @id @default(uuid()) @db.Uuid
  nome         String
  email        String?    @unique
  senha        String
  tipo_usuario String
  criadoem     DateTime   @default(now())
  atualizadoem DateTime   @updatedAt

  timesCapitao  Time[]    @relation("CapitaoTime")
  eventosCriados Evento[]

  @@map("usuarios")
}


model Evento {
  id               String       @id @default(uuid()) @db.Uuid
  nome             String
  localizacao      String
  tipoCompeticao   String?
  descricao        String?
  imagemUrl        String?
  status           String       @default("planejada")
  dataInicio       DateTime?
  dataFim          DateTime?
  privada          Boolean      @default(false)
  maxParticipantes Int? 
  criadaEm         DateTime     @default(now())
  atualizadaEm     DateTime     @updatedAt

  userId           String       @db.Uuid
  dono             Usuario      @relation(fields: [userId], references: [id])
  modalidades      Modalidade[]
  times            Time[]
  partidas         Partida[]
}

model Modalidade {
  id_modalidade String     @id @default(uuid()) @db.Uuid
  nome          String
  sexo          String?
  id_evento     String     @db.Uuid
  evento        Evento     @relation(fields: [id_evento], references: [id], onDelete: Cascade)
  times         Time[]
  partidas      Partida[]

  @@map("Modalidade")
}

model Time {
  id_time       String     @id @default(uuid()) @db.Uuid
  nome          String
  id_modalidade String     @db.Uuid
  id_capitao    String?    @db.Uuid
  id_evento     String     @db.Uuid

  modalidade    Modalidade @relation(fields: [id_modalidade], references: [id_modalidade], onDelete: Cascade)
  capitao       Usuario?   @relation("CapitaoTime", fields: [id_capitao], references: [id], onDelete: SetNull)
  evento        Evento     @relation(fields: [id_evento], references: [id], onDelete: Cascade)

  jogadores     Jogador[]  @relation("JogadoresTimes")
  partidas1     Partida[]  @relation("Time1")
  partidas2     Partida[]  @relation("Time2")
  resultadosComoVencedor Resultado[]

  criadoEm      DateTime   @default(now())
  atualizadoEm  DateTime   @updatedAt

  descricao     String?
  fotoUrl       String?

  @@unique([nome, id_modalidade])
  @@map("Times")
}

model Jogador {
  id_jogador   String    @id @default(uuid()) @db.Uuid
  nome         String
  rm           String?
  idade        Int?
  sexo         String?
  times        Time[]    @relation("JogadoresTimes")

  criadoEm     DateTime  @default(now())
  atualizadoEm DateTime  @updatedAt

  @@map("Jogadores")
}

model Partida {
  id_partida        String     @id @default(uuid()) @db.Uuid
  nivel_eliminacao  Int?
  data_hora         DateTime
  id_modalidade     String     @db.Uuid
  id_time1          String     @db.Uuid
  id_time2          String     @db.Uuid
  id_evento         String     @db.Uuid

  modalidade        Modalidade @relation(fields: [id_modalidade], references: [id_modalidade])
  evento            Evento     @relation(fields: [id_evento], references: [id])
  time1             Time       @relation("Time1", fields: [id_time1], references: [id_time])
  time2             Time       @relation("Time2", fields: [id_time2], references: [id_time])
  resultado         Resultado?

  @@map("Partidas")
}

model Resultado {
  id_resultado     String   @id @default(uuid()) @db.Uuid
  id_partida       String   @unique @db.Uuid
  pontuacao_time1  Int?
  pontuacao_time2  Int?
  vencedor         String?  @db.Uuid

  partida          Partida  @relation(fields: [id_partida], references: [id_partida])
  timeVencedor     Time?    @relation(fields: [vencedor], references: [id_time])

  @@map("Resultado")
}




chat desse meu banco do TCC, eu gostaria de implementar uma ideia para que a tabela jogadores fossem uma intermediária com uma tabela atletas, tipo, quando um jogador fosse inserido faria a verificação na tabela atletas se ele já tem um cadastro um não, caso não esteja, vá para uma tela de cadastro de novo atleta.

vc acha que para controlar isso seria melhor só o admin conseguir cadastrar os atletas e os capitães selecionassem 
