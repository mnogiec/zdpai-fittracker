import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export class Seed1735547501477 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO exercise (
        id, name, "categoryId", description, "videoUrl", "creatorId", "isPrivate", "imageUrl", "updatedAt"
      ) VALUES
      ('${uuidv4()}', 'T-Bar Row', 4, 'Compound exercise for mid to upper back development.', 'https://www.youtube.com/watch?v=yPis7nlbqdY', NULL, false, 'https://images.ctfassets.net/8urtyqugdt2l/5pziwWANOaPjQS2caLU8vd/83764919b6f35d9b053dd33bcb591fc9/t-bar-row-thumbnail.jpg', NOW()),
      ('${uuidv4()}', 'Back Extensions', 4, 'Strengthen the lower back muscles.', 'https://www.youtube.com/watch?v=5_ejbGfdAQE', NULL, false, 'https://hips.hearstapps.com/hmg-prod/images/screen-shot-2022-11-11-at-9-49-18-am-1668183899.png', NOW()),
      ('${uuidv4()}', 'Pec Deck Machine', 5, 'Isolates the chest muscles with controlled movement.', 'https://www.youtube.com/watch?v=O-OBCfyh9Fw', NULL, false, 'https://workouthealthy.com/cdn/shop/files/BS-DPEC-SF_Body-Solid-Pec-Deck-Rear-Delt-Fly-Machine.webp?v=1699486491', NOW()),
      ('${uuidv4()}', 'Dips', 5, 'Emphasizes the lower chest and triceps when leaning forward.', 'https://www.youtube.com/watch?v=o2qX3Zb5mvg', NULL, false, 'https://hips.hearstapps.com/hmg-prod/images/dips-1608221119.jpg?resize=980:*', NOW()),
      ('${uuidv4()}', 'Chest Flys', 5, 'Can be done with dumbbells or a cable machine to enhance chest width and depth.', 'https://www.youtube.com/watch?v=eozdVDA78K0', NULL, false, 'https://www.garagegymreviews.com/wp-content/uploads/woman-doing-an-incline-chest-fly.jpg', NOW()),
      ('${uuidv4()}', 'Incline Dumbbell Press', 5, NULL, 'https://www.youtube.com/watch?v=8iPEnn-ltC8', NULL, false, 'https://www.dmoose.com/cdn/shop/articles/1_8a79831d-72ad-4d42-aca0-9bc7580f575b.jpg?v=1648826825', NOW()),
      ('${uuidv4()}', 'Push-ups', 5, 'Versatile bodyweight exercise that targets the chest along with other upper body muscles.', 'https://www.youtube.com/watch?v=IODxDxX7oi4', NULL, false, 'https://cdn.mos.cms.futurecdn.net/oYDbf5hQAePHEBNZTQMXRA.jpg', NOW()),
      ('${uuidv4()}', 'Bench Press', 5, 'Standard exercise using a barbell to build the pectoral muscles.', 'https://www.youtube.com/watch?v=rT7DgCr-3pg', NULL, false, 'https://www.trainheroic.com/wp-content/uploads/2021/09/Bench-press.jpg', NOW()),
      ('${uuidv4()}', 'Face Pulls', 4, 'Improve rear deltoids and upper back muscles.', 'https://www.youtube.com/watch?v=0Po47vvj9g4', NULL, false, 'https://www.garagegymreviews.com/wp-content/uploads/woman-performing-cable-face-pull.jpg', NOW()),
      ('${uuidv4()}', 'Lat Pulldowns', 4, NULL, 'https://www.youtube.com/watch?v=JGeRYIZdojU', NULL, false, 'https://miro.medium.com/v2/resize:fit:1358/0*7g3xHWvaXcGhd2Ag.jpg', NOW()),
      ('${uuidv4()}', 'Bent-over Rows', 4, 'Great for horizontal pulling strength, targeting mid-back.', 'https://www.youtube.com/watch?v=6FZHJGzMFEc', NULL, false, 'https://hips.hearstapps.com/hmg-prod/images/joshua-simpson-kettlebell-vs-dumbbell-kb-bent-over-alternating-row-219-1636665510.jpg?crop=0.529xw:0.767xh;0.288xw,0.198xh&resize=1200:*', NOW()),
      ('${uuidv4()}', 'Deadlifts', 4, NULL, 'https://www.youtube.com/watch?v=AweC3UaM14o', NULL, false, 'https://experiencelife.lifetime.life/wp-content/uploads/2021/08/f2-barbell-deadlift.jpg', NOW()),
      ('${uuidv4()}', 'Pull-ups', 4, 'Strengthen the entire back and biceps with bodyweight.', 'https://www.youtube.com/watch?v=aAggnpPyR6E', NULL, false, 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2019/12/pull-up-pullup-gym-1296x728-header-1296x728.jpg?w=1155&h=1528', NOW()),
      ('${uuidv4()}', 'Chin-ups', 3, 'Also works the biceps along with the back.', 'https://www.youtube.com/watch?v=8mryJ3w2S78', NULL, false, 'https://media.self.com/photos/5bad13813f15b979ec0368eb/master/pass/woman-doing-chin-up.jpg', NOW()),
      ('${uuidv4()}', 'Cable Curl', 3, 'Provides constant tension through the motion.', 'https://www.youtube.com/watch?v=opFVuRi_3b8', NULL, false, 'https://origympersonaltrainercourses.co.uk/files/img_cache/9418/1920_1603357692_bicepcablecurl.JPG?1603357910', NOW()),
      ('${uuidv4()}', 'Preacher Curl', 3, 'Stabilizes the arm, increasing isolation during the curl.', 'https://www.youtube.com/watch?v=Ja6ZlIDONac', NULL, false, 'https://prod-ne-cdn-media.puregym.com/media/819541/preacher-curls.png?quality=80', NOW()),
      ('${uuidv4()}', 'Concentration Curl', 3, 'Isolates one bicep at a time for focused tension.', 'https://www.youtube.com/watch?v=VMbDQ8PZazY', NULL, false, 'https://cdn.muscleandstrength.com/sites/default/files/seated-concentration-curl.jpg', NOW()),
      ('${uuidv4()}', 'Hammer Curl', 3, 'Targets the biceps and brachialis with a neutral grip.', 'https://www.youtube.com/watch?v=RIEMoYL_h1Y', NULL, false, 'https://www.trainheroic.com/wp-content/uploads/2023/02/AdobeStock_417412809-TH-jpg.webp', NOW()),
      ('${uuidv4()}', 'Barbell Curl', 3, 'Classic exercise for bicep growth.', 'https://www.youtube.com/watch?v=JnLFSFurrqQ', NULL, false, 'https://mirafit.co.uk/wp/wp-content/uploads/2019/08/fitness-expert-doing-bicep-curls-with-an-ez-cutl-bar-1024x683.jpg', NOW()),
      ('${uuidv4()}', 'Diamond Push-ups', 2, 'Bodyweight exercise focusing on the triceps and chest.', 'https://www.youtube.com/watch?v=XtU2VQVuLYs', NULL, false, 'https://res.cloudinary.com/peloton-cycle/image/fetch/f_auto,c_limit,w_3840,q_90/https://images.ctfassets.net/6ilvqec50fal/JdeBsAsNI2XepyM4IDL1U/ef2c96e26f7c3af5bce6db428cd1237f/Screenshot_2024-03-21_at_12.36.05_PM.png', NOW());
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM exercise`);
  }
}
