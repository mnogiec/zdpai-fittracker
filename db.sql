--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

-- Started on 2024-12-31 12:02:11

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 132083)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 4908 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 221 (class 1259 OID 132125)
-- Name: exercise; Type: TABLE; Schema: public; Owner: fittrackeradmin
--

CREATE TABLE public.exercise (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    description character varying,
    "videoUrl" character varying,
    "imageUrl" character varying,
    "isPrivate" boolean NOT NULL,
    "categoryId" integer,
    "creatorId" uuid,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.exercise OWNER TO fittrackeradmin;

--
-- TOC entry 220 (class 1259 OID 132117)
-- Name: exercise_category; Type: TABLE; Schema: public; Owner: fittrackeradmin
--

CREATE TABLE public.exercise_category (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.exercise_category OWNER TO fittrackeradmin;

--
-- TOC entry 219 (class 1259 OID 132116)
-- Name: exercise_category_id_seq; Type: SEQUENCE; Schema: public; Owner: fittrackeradmin
--

CREATE SEQUENCE public.exercise_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.exercise_category_id_seq OWNER TO fittrackeradmin;

--
-- TOC entry 4909 (class 0 OID 0)
-- Dependencies: 219
-- Name: exercise_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fittrackeradmin
--

ALTER SEQUENCE public.exercise_category_id_seq OWNED BY public.exercise_category.id;


--
-- TOC entry 217 (class 1259 OID 132095)
-- Name: migrations; Type: TABLE; Schema: public; Owner: fittrackeradmin
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO fittrackeradmin;

--
-- TOC entry 216 (class 1259 OID 132094)
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: fittrackeradmin
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.migrations_id_seq OWNER TO fittrackeradmin;

--
-- TOC entry 4910 (class 0 OID 0)
-- Dependencies: 216
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fittrackeradmin
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- TOC entry 218 (class 1259 OID 132103)
-- Name: user; Type: TABLE; Schema: public; Owner: fittrackeradmin
--

CREATE TABLE public."user" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    "firstName" character varying NOT NULL,
    "lastName" character varying NOT NULL,
    "isAdmin" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."user" OWNER TO fittrackeradmin;

--
-- TOC entry 222 (class 1259 OID 132145)
-- Name: workout_day; Type: TABLE; Schema: public; Owner: fittrackeradmin
--

CREATE TABLE public.workout_day (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "userId" uuid,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    date timestamp with time zone NOT NULL
);


ALTER TABLE public.workout_day OWNER TO fittrackeradmin;

--
-- TOC entry 223 (class 1259 OID 132153)
-- Name: workout_exercise; Type: TABLE; Schema: public; Owner: fittrackeradmin
--

CREATE TABLE public.workout_exercise (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    sets integer NOT NULL,
    reps integer NOT NULL,
    weight integer NOT NULL,
    "exerciseId" uuid,
    "workoutDayId" uuid
);


ALTER TABLE public.workout_exercise OWNER TO fittrackeradmin;

--
-- TOC entry 4725 (class 2604 OID 132120)
-- Name: exercise_category id; Type: DEFAULT; Schema: public; Owner: fittrackeradmin
--

ALTER TABLE ONLY public.exercise_category ALTER COLUMN id SET DEFAULT nextval('public.exercise_category_id_seq'::regclass);


--
-- TOC entry 4720 (class 2604 OID 132098)
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: fittrackeradmin
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- TOC entry 4900 (class 0 OID 132125)
-- Dependencies: 221
-- Data for Name: exercise; Type: TABLE DATA; Schema: public; Owner: fittrackeradmin
--

INSERT INTO public.exercise VALUES ('e5ea49d6-cc6a-4ad9-8b75-00796d394c58', 'T-Bar Row', 'Compound exercise for mid to upper back development.', 'https://www.youtube.com/watch?v=yPis7nlbqdY', 'https://images.ctfassets.net/8urtyqugdt2l/5pziwWANOaPjQS2caLU8vd/83764919b6f35d9b053dd33bcb591fc9/t-bar-row-thumbnail.jpg', false, 4, NULL, '2024-12-30 09:47:48.686498+01', '2024-12-30 09:47:48.686498+01');
INSERT INTO public.exercise VALUES ('6450e14b-502c-4348-a9b5-98275e096509', 'Back Extensions', 'Strengthen the lower back muscles.', 'https://www.youtube.com/watch?v=5_ejbGfdAQE', 'https://hips.hearstapps.com/hmg-prod/images/screen-shot-2022-11-11-at-9-49-18-am-1668183899.png', false, 4, NULL, '2024-12-30 09:47:48.686498+01', '2024-12-30 09:47:48.686498+01');
INSERT INTO public.exercise VALUES ('392bc3ea-6965-4540-9b5c-a44d1bf61714', 'Pec Deck Machine', 'Isolates the chest muscles with controlled movement.', 'https://www.youtube.com/watch?v=O-OBCfyh9Fw', 'https://workouthealthy.com/cdn/shop/files/BS-DPEC-SF_Body-Solid-Pec-Deck-Rear-Delt-Fly-Machine.webp?v=1699486491', false, 5, NULL, '2024-12-30 09:47:48.686498+01', '2024-12-30 09:47:48.686498+01');
INSERT INTO public.exercise VALUES ('713de9a5-b5ee-4a31-81f3-ba718952c371', 'Dips', 'Emphasizes the lower chest and triceps when leaning forward.', 'https://www.youtube.com/watch?v=o2qX3Zb5mvg', 'https://hips.hearstapps.com/hmg-prod/images/dips-1608221119.jpg?resize=980:*', false, 5, NULL, '2024-12-30 09:47:48.686498+01', '2024-12-30 09:47:48.686498+01');
INSERT INTO public.exercise VALUES ('6bbea516-e149-4647-bf36-de7f5bcfd006', 'Chest Flys', 'Can be done with dumbbells or a cable machine to enhance chest width and depth.', 'https://www.youtube.com/watch?v=eozdVDA78K0', 'https://www.garagegymreviews.com/wp-content/uploads/woman-doing-an-incline-chest-fly.jpg', false, 5, NULL, '2024-12-30 09:47:48.686498+01', '2024-12-30 09:47:48.686498+01');
INSERT INTO public.exercise VALUES ('4735affd-aebd-43d7-8fbc-3f7ebb61834e', 'Incline Dumbbell Press', NULL, 'https://www.youtube.com/watch?v=8iPEnn-ltC8', 'https://www.dmoose.com/cdn/shop/articles/1_8a79831d-72ad-4d42-aca0-9bc7580f575b.jpg?v=1648826825', false, 5, NULL, '2024-12-30 09:47:48.686498+01', '2024-12-30 09:47:48.686498+01');
INSERT INTO public.exercise VALUES ('6f0b0e83-120a-4294-9baf-bbdc7b26ac53', 'Push-ups', 'Versatile bodyweight exercise that targets the chest along with other upper body muscles.', 'https://www.youtube.com/watch?v=IODxDxX7oi4', 'https://cdn.mos.cms.futurecdn.net/oYDbf5hQAePHEBNZTQMXRA.jpg', false, 5, NULL, '2024-12-30 09:47:48.686498+01', '2024-12-30 09:47:48.686498+01');
INSERT INTO public.exercise VALUES ('fcfbb21c-de9a-4483-bf98-1923a8b746ad', 'Bench Press', 'Standard exercise using a barbell to build the pectoral muscles.', 'https://www.youtube.com/watch?v=rT7DgCr-3pg', 'https://www.trainheroic.com/wp-content/uploads/2021/09/Bench-press.jpg', false, 5, NULL, '2024-12-30 09:47:48.686498+01', '2024-12-30 09:47:48.686498+01');
INSERT INTO public.exercise VALUES ('86179924-5123-498e-bb64-28763f4d734d', 'Face Pulls', 'Improve rear deltoids and upper back muscles.', 'https://www.youtube.com/watch?v=0Po47vvj9g4', 'https://www.garagegymreviews.com/wp-content/uploads/woman-performing-cable-face-pull.jpg', false, 4, NULL, '2024-12-30 09:47:48.686498+01', '2024-12-30 09:47:48.686498+01');
INSERT INTO public.exercise VALUES ('b146f917-107c-4f9d-96bd-c4e43db51cb7', 'Lat Pulldowns', NULL, 'https://www.youtube.com/watch?v=JGeRYIZdojU', 'https://miro.medium.com/v2/resize:fit:1358/0*7g3xHWvaXcGhd2Ag.jpg', false, 4, NULL, '2024-12-30 09:47:48.686498+01', '2024-12-30 09:47:48.686498+01');
INSERT INTO public.exercise VALUES ('b00381d3-8bd1-4ac1-9d7b-dea057b0991b', 'Bent-over Rows', 'Great for horizontal pulling strength, targeting mid-back.', 'https://www.youtube.com/watch?v=6FZHJGzMFEc', 'https://hips.hearstapps.com/hmg-prod/images/joshua-simpson-kettlebell-vs-dumbbell-kb-bent-over-alternating-row-219-1636665510.jpg?crop=0.529xw:0.767xh;0.288xw,0.198xh&resize=1200:*', false, 4, NULL, '2024-12-30 09:47:48.686498+01', '2024-12-30 09:47:48.686498+01');
INSERT INTO public.exercise VALUES ('02e0d05e-9738-4929-8022-d04421dade8f', 'Deadlifts', NULL, 'https://www.youtube.com/watch?v=AweC3UaM14o', 'https://experiencelife.lifetime.life/wp-content/uploads/2021/08/f2-barbell-deadlift.jpg', false, 4, NULL, '2024-12-30 09:47:48.686498+01', '2024-12-30 09:47:48.686498+01');
INSERT INTO public.exercise VALUES ('442991d0-6b62-497d-acfb-85755cbcbe4c', 'Pull-ups', 'Strengthen the entire back and biceps with bodyweight.', 'https://www.youtube.com/watch?v=aAggnpPyR6E', 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2019/12/pull-up-pullup-gym-1296x728-header-1296x728.jpg?w=1155&h=1528', false, 4, NULL, '2024-12-30 09:47:48.686498+01', '2024-12-30 09:47:48.686498+01');
INSERT INTO public.exercise VALUES ('d042f361-1c2d-4abb-b071-b9e485732a2e', 'Chin-ups', 'Also works the biceps along with the back.', 'https://www.youtube.com/watch?v=8mryJ3w2S78', 'https://media.self.com/photos/5bad13813f15b979ec0368eb/master/pass/woman-doing-chin-up.jpg', false, 3, NULL, '2024-12-30 09:47:48.686498+01', '2024-12-30 09:47:48.686498+01');
INSERT INTO public.exercise VALUES ('52edce93-abc2-400f-a570-d7ee60fc42dc', 'Preacher Curl', 'Stabilizes the arm, increasing isolation during the curl.', 'https://www.youtube.com/watch?v=Ja6ZlIDONac', 'https://prod-ne-cdn-media.puregym.com/media/819541/preacher-curls.png?quality=80', false, 3, NULL, '2024-12-30 09:47:48.686498+01', '2024-12-30 09:47:48.686498+01');
INSERT INTO public.exercise VALUES ('b4c76dae-3d19-49e3-9851-5ee11a3e47fe', 'Concentration Curl', 'Isolates one bicep at a time for focused tension.', 'https://www.youtube.com/watch?v=VMbDQ8PZazY', 'https://cdn.muscleandstrength.com/sites/default/files/seated-concentration-curl.jpg', false, 3, NULL, '2024-12-30 09:47:48.686498+01', '2024-12-30 09:47:48.686498+01');
INSERT INTO public.exercise VALUES ('2690cc19-9ef3-47c9-9436-142d58c0ae66', 'Hammer Curl', 'Targets the biceps and brachialis with a neutral grip.', 'https://www.youtube.com/watch?v=RIEMoYL_h1Y', 'https://www.trainheroic.com/wp-content/uploads/2023/02/AdobeStock_417412809-TH-jpg.webp', false, 3, NULL, '2024-12-30 09:47:48.686498+01', '2024-12-30 09:47:48.686498+01');
INSERT INTO public.exercise VALUES ('129d3639-cfcc-4234-825d-63a7b9d04283', 'Barbell Curl', 'Classic exercise for bicep growth.', 'https://www.youtube.com/watch?v=JnLFSFurrqQ', 'https://mirafit.co.uk/wp/wp-content/uploads/2019/08/fitness-expert-doing-bicep-curls-with-an-ez-cutl-bar-1024x683.jpg', false, 3, NULL, '2024-12-30 09:47:48.686498+01', '2024-12-30 09:47:48.686498+01');
INSERT INTO public.exercise VALUES ('e3c33d86-7bf0-48e6-9cb1-eaa0018b4f09', 'Diamond Push-ups', 'Bodyweight exercise focusing on the triceps and chest.', 'https://www.youtube.com/watch?v=XtU2VQVuLYs', 'https://res.cloudinary.com/peloton-cycle/image/fetch/f_auto,c_limit,w_3840,q_90/https://images.ctfassets.net/6ilvqec50fal/JdeBsAsNI2XepyM4IDL1U/ef2c96e26f7c3af5bce6db428cd1237f/Screenshot_2024-03-21_at_12.36.05_PM.png', false, 2, NULL, '2024-12-30 09:47:48.686498+01', '2024-12-30 09:47:48.686498+01');
INSERT INTO public.exercise VALUES ('038f4499-2bdd-4c32-97d2-5d60352f01cf', 'Cable Curl', 'Provides constant tension through the motion.', 'https://www.youtube.com/watch?v=opFVuRi_3b8', 'https://musclesquad.com/cdn/shop/articles/how-to-perform-a-cable-curl_1024x1024.jpg?v=1720613487', false, 3, NULL, '2024-12-30 09:47:48.686498+01', '2024-12-30 09:49:36.100245+01');
INSERT INTO public.exercise VALUES ('36f73e79-602f-484a-9a6d-d8fdaab747e4', 'Dips - the best', '', 'https://www.youtube.com/watch?v=opFVuRi_3b8', 'https://static.independent.co.uk/2024/09/03/13/how-to-perform-a-barbell-squat-correctly.jpg?width=1200&height=900&fit=crop', true, 2, '74e8b319-3697-4566-b851-dd7b5837625c', '2024-12-31 11:55:49.643303+01', '2024-12-31 11:55:49.643303+01');


--
-- TOC entry 4899 (class 0 OID 132117)
-- Dependencies: 220
-- Data for Name: exercise_category; Type: TABLE DATA; Schema: public; Owner: fittrackeradmin
--

INSERT INTO public.exercise_category VALUES (1, 'Legs');
INSERT INTO public.exercise_category VALUES (2, 'Triceps');
INSERT INTO public.exercise_category VALUES (3, 'Biceps');
INSERT INTO public.exercise_category VALUES (4, 'Back');
INSERT INTO public.exercise_category VALUES (5, 'Chest');


--
-- TOC entry 4896 (class 0 OID 132095)
-- Dependencies: 217
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: fittrackeradmin
--

INSERT INTO public.migrations VALUES (1, 1734940220834, 'CreateUser1734940220834');
INSERT INTO public.migrations VALUES (2, 1735032373707, 'CreateExerciseCategories1735032373707');
INSERT INTO public.migrations VALUES (3, 1735047232976, 'CreateExercise1735047232976');
INSERT INTO public.migrations VALUES (4, 1735050393187, 'CreateWorkoutDaysAndExercises1735050393187');
INSERT INTO public.migrations VALUES (5, 1735050578673, 'AddTimezonesToTimestamps1735050578673');
INSERT INTO public.migrations VALUES (6, 1735547501477, 'Seed1735547501477');


--
-- TOC entry 4897 (class 0 OID 132103)
-- Dependencies: 218
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: fittrackeradmin
--

INSERT INTO public."user" VALUES ('74e8b319-3697-4566-b851-dd7b5837625c', 'nogiecmikolaj@gmail.com', '$2b$10$WnIg0055t7sID.JOH8JjtObxc9YDvX/VBwTqB7J4bSz.gc4hV.nxu', 'Mikołaj', 'Nogieć', true, '2024-12-30 09:48:48.314633+01', '2024-12-30 09:48:48.314633+01');
INSERT INTO public."user" VALUES ('4d0810f2-0dde-4126-b55e-b9c9c4c29cec', 'nogiecmikolaj+1@gmail.com', '$2b$10$VZwx9rJwZwhJhtYvw7eEC.xARVHiMdabQ555QJcZFQu0OOlNUBF3.', 'Mikołaj', 'Nogieć', false, '2024-12-31 12:00:31.908151+01', '2024-12-31 12:00:31.908151+01');


--
-- TOC entry 4901 (class 0 OID 132145)
-- Dependencies: 222
-- Data for Name: workout_day; Type: TABLE DATA; Schema: public; Owner: fittrackeradmin
--



--
-- TOC entry 4902 (class 0 OID 132153)
-- Dependencies: 223
-- Data for Name: workout_exercise; Type: TABLE DATA; Schema: public; Owner: fittrackeradmin
--



--
-- TOC entry 4911 (class 0 OID 0)
-- Dependencies: 219
-- Name: exercise_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fittrackeradmin
--

SELECT pg_catalog.setval('public.exercise_category_id_seq', 5, true);


--
-- TOC entry 4912 (class 0 OID 0)
-- Dependencies: 216
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fittrackeradmin
--

SELECT pg_catalog.setval('public.migrations_id_seq', 6, true);


--
-- TOC entry 4744 (class 2606 OID 132152)
-- Name: workout_day PK_1c2ac7fddbf8f346f5c1c2229ec; Type: CONSTRAINT; Schema: public; Owner: fittrackeradmin
--

ALTER TABLE ONLY public.workout_day
    ADD CONSTRAINT "PK_1c2ac7fddbf8f346f5c1c2229ec" PRIMARY KEY (id);


--
-- TOC entry 4734 (class 2606 OID 132102)
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: fittrackeradmin
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- TOC entry 4746 (class 2606 OID 132158)
-- Name: workout_exercise PK_9598996a913c5f5114f9e6403b6; Type: CONSTRAINT; Schema: public; Owner: fittrackeradmin
--

ALTER TABLE ONLY public.workout_exercise
    ADD CONSTRAINT "PK_9598996a913c5f5114f9e6403b6" PRIMARY KEY (id);


--
-- TOC entry 4740 (class 2606 OID 132124)
-- Name: exercise_category PK_977a54be5b15644bf5dc22093d5; Type: CONSTRAINT; Schema: public; Owner: fittrackeradmin
--

ALTER TABLE ONLY public.exercise_category
    ADD CONSTRAINT "PK_977a54be5b15644bf5dc22093d5" PRIMARY KEY (id);


--
-- TOC entry 4742 (class 2606 OID 132134)
-- Name: exercise PK_a0f107e3a2ef2742c1e91d97c14; Type: CONSTRAINT; Schema: public; Owner: fittrackeradmin
--

ALTER TABLE ONLY public.exercise
    ADD CONSTRAINT "PK_a0f107e3a2ef2742c1e91d97c14" PRIMARY KEY (id);


--
-- TOC entry 4736 (class 2606 OID 132113)
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: fittrackeradmin
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- TOC entry 4738 (class 2606 OID 132115)
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: fittrackeradmin
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


--
-- TOC entry 4750 (class 2606 OID 132169)
-- Name: workout_exercise FK_0e37ef5b503b55b34643ef507e9; Type: FK CONSTRAINT; Schema: public; Owner: fittrackeradmin
--

ALTER TABLE ONLY public.workout_exercise
    ADD CONSTRAINT "FK_0e37ef5b503b55b34643ef507e9" FOREIGN KEY ("workoutDayId") REFERENCES public.workout_day(id);


--
-- TOC entry 4747 (class 2606 OID 132140)
-- Name: exercise FK_25cecff361c08584f2a91261664; Type: FK CONSTRAINT; Schema: public; Owner: fittrackeradmin
--

ALTER TABLE ONLY public.exercise
    ADD CONSTRAINT "FK_25cecff361c08584f2a91261664" FOREIGN KEY ("creatorId") REFERENCES public."user"(id);


--
-- TOC entry 4751 (class 2606 OID 132164)
-- Name: workout_exercise FK_a2ac7d92eeb9bd5fc2bb9896611; Type: FK CONSTRAINT; Schema: public; Owner: fittrackeradmin
--

ALTER TABLE ONLY public.workout_exercise
    ADD CONSTRAINT "FK_a2ac7d92eeb9bd5fc2bb9896611" FOREIGN KEY ("exerciseId") REFERENCES public.exercise(id);


--
-- TOC entry 4749 (class 2606 OID 132159)
-- Name: workout_day FK_ae560401df37ecbef136d5e1e93; Type: FK CONSTRAINT; Schema: public; Owner: fittrackeradmin
--

ALTER TABLE ONLY public.workout_day
    ADD CONSTRAINT "FK_ae560401df37ecbef136d5e1e93" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- TOC entry 4748 (class 2606 OID 132135)
-- Name: exercise FK_d61e87cf918b359c439f071634b; Type: FK CONSTRAINT; Schema: public; Owner: fittrackeradmin
--

ALTER TABLE ONLY public.exercise
    ADD CONSTRAINT "FK_d61e87cf918b359c439f071634b" FOREIGN KEY ("categoryId") REFERENCES public.exercise_category(id);


-- Completed on 2024-12-31 12:02:11

--
-- PostgreSQL database dump complete
--

