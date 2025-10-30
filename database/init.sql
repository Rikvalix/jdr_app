--1. Joueurs
CREATE TABLE public.players (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL UNIQUE,
  avatar_url text,
  CONSTRAINT players_pkey PRIMARY KEY (id)
);

--2. Campagnes
CREATE TABLE public.campaigns (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  name text NOT NULL,
  game_master_id bigint,
  description text,
  CONSTRAINT campaigns_pkey PRIMARY KEY (id),
  CONSTRAINT campaigns_game_master_id_fkey FOREIGN KEY (game_master_id) REFERENCES public.players(id)
);

-- 3. Jointure: joueurs - campagnes
CREATE TABLE public.players_campaigns (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  player_id bigint NOT NULL,
  campaign_id bigint NOT NULL,
  CONSTRAINT players_campaigns_pkey PRIMARY KEY (id),
  CONSTRAINT players_campaign_player_id_fkey FOREIGN KEY (player_id) REFERENCES public.players(id),
  CONSTRAINT players_campaign_campaign_id_fkey FOREIGN KEY (campaign_id) REFERENCES public.campaigns(id)
);

-- 4. Personnage
CREATE TABLE public.characters (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  name text NOT NULL,
  concept text,
  description text,
  avatar_url text,
  player_id bigint NOT NULL,
  campaign_id bigint,
  is_public boolean DEFAULT false,
  force integer NOT NULL DEFAULT 10,
  dexterite integer NOT NULL DEFAULT 10,
  constitution integer NOT NULL DEFAULT 10,
  intelligence integer NOT NULL DEFAULT 10,
  sagesse integer NOT NULL DEFAULT 10,
  charisme integer NOT NULL DEFAULT 10,
  inventory jsonb,
  CONSTRAINT characters_pkey PRIMARY KEY (id),
  CONSTRAINT characters_player_id_fkey FOREIGN KEY (player_id) REFERENCES public.players(id),
  CONSTRAINT characters_campaign_id_fkey FOREIGN KEY (campaign_id) REFERENCES public.campaigns(id)
);

-- 5. Maitrises
CREATE TABLE public.abilities (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name character varying NOT NULL,
  description text,
  CONSTRAINT abilities_pkey PRIMARY KEY (id)
);

-- 6. Attaques
CREATE TABLE public.attacks (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name character varying NOT NULL,
  description text,
  CONSTRAINT attacks_pkey PRIMARY KEY (id)
);

-- 7. Relations / Histoire avec d'autres personnages
CREATE TABLE public.bonds (
  id integer NOT NULL DEFAULT nextval('characters_bonds_id_seq'::regclass),
  target_name character varying NOT NULL,
  relationship_description text,
  CONSTRAINT bonds_pkey PRIMARY KEY (id)
);

-- 8. Jointures: Personnage - Maitrise
CREATE TABLE public.characters_abilities (
  id integer NOT NULL DEFAULT nextval('characters_abilities_id_seq1'::regclass),
  character_id integer,
  abilities_id integer,
  CONSTRAINT characters_abilities_pkey PRIMARY KEY (id),
  CONSTRAINT characters_abilities_character_id_fkey FOREIGN KEY (character_id) REFERENCES public.characters(id),
  CONSTRAINT characters_abilities_abilities_id_fkey FOREIGN KEY (abilities_id) REFERENCES public.abilities(id)
);

-- 9. Jointures: Personnage - Attaques
CREATE TABLE public.characters_attack (
  id integer NOT NULL DEFAULT nextval('characters_attack_id_seq'::regclass),
  character_id integer,
  attack_id integer,
  CONSTRAINT characters_attack_pkey PRIMARY KEY (id),
  CONSTRAINT characters_attack_character_id_fkey FOREIGN KEY (character_id) REFERENCES public.characters(id),
  CONSTRAINT characters_attack_attack_id_fkey FOREIGN KEY (attack_id) REFERENCES public.attacks(id)
);

-- 10. Jointures: Personnage - Relations
CREATE TABLE public.characters_bonds (
  id integer NOT NULL DEFAULT nextval('characters_bonds_id_seq1'::regclass),
  character_id integer,
  bond_id integer,
  CONSTRAINT characters_bonds_pkey PRIMARY KEY (id),
  CONSTRAINT characters_bonds_character_id_fkey FOREIGN KEY (character_id) REFERENCES public.characters(id),
  CONSTRAINT characters_bonds_bond_id_fkey FOREIGN KEY (bond_id) REFERENCES public.bonds(id)
);

-- 11. Classe du personnage
CREATE TABLE public.class (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name character varying,
  description text,
  CONSTRAINT class_pkey PRIMARY KEY (id)
);

-- 12. Jointure: Personnage - Classe
CREATE TABLE public.characters_class (
  id integer NOT NULL DEFAULT nextval('characters_class_id_seq1'::regclass),
  character_id integer,
  class_id integer,
  CONSTRAINT characters_class_pkey PRIMARY KEY (id),
  CONSTRAINT characters_class_character_id_fkey FOREIGN KEY (character_id) REFERENCES public.characters(id),
  CONSTRAINT characters_class_class_id_fkey FOREIGN KEY (class_id) REFERENCES public.class(id)
);


-- 13. Abilités d'une classe
CREATE TABLE public.class_abilities (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  class_id bigint,
  name character varying,
  description text,
  CONSTRAINT class_abilities_pkey PRIMARY KEY (id),
  CONSTRAINT class_abilities_class_id_fkey FOREIGN KEY (class_id) REFERENCES public.class(id)
);
