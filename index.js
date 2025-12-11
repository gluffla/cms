/*import { getConnection } from "./db.js";

const SQL = `
SELECT
u.last_name AS "Фамилия",
u.first_name AS "Имя",
u.username AS "Никнейм",
u.registration_date
FROM user u
WHERE u.registration_date IS NULL;
`;

async function main() {
  const conn = await getConnection();
  try {
    const [rows] = await conn.query(SQL);
    console.log("=== USERS AND THEIR PERMISSIONS ===");
    if (!rows.length) {
      console.log("No users found or query returned empty result.");
    } else {
      for (const r of rows) {
        console.log(`${r.id}: ${r.username} → ${r.permissions || "(no permissions)"}`);
      }
    }
  } catch (err) {
    console.error("Query error:", err.message);
  } finally {
    await conn.end();
  }
}

main();
*/
import { getConnection } from "./db.js";

async function main() {
  const connection = await getConnection();

  const sql = `
    SELECT 
        u.first_name,
        u.last_name,
        GROUP_CONCAT(DISTINCT p.code) AS permissions
    FROM user u
    LEFT JOIN role_has_user ru ON u.id_u = ru.user_id_u
    LEFT JOIN role r ON ru.role_id_r = r.id_r
    LEFT JOIN role_has_permission rp ON r.id_r = rp.role_id_r
    LEFT JOIN permission p ON rp.permission_id_p = p.id_p
    GROUP BY u.id_u
    ORDER BY u.last_name;
  `;

  try {
    const [rows] = await connection.query(sql);
    console.log("USERS AND THEIR PERMISSIONS");
    rows.forEach(row => {
      console.log(`${row.first_name} ${row.last_name} → ${row.permissions || "(no permissions)"}`);
    });
  } catch (err) {
    console.error("Ошибка запроса:", err.message);
  } finally {
    await connection.end();
    console.log("Подключение закрыто");
  }
}

main();