//iteraction with database
import fs from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = new URL('../db.json', import.meta.url).pathname;
const resolvedPath = process.platform === 'win32' ? DB_PATH.slice(1) : DB_PATH;
export const getDB=async()=>{
    const db=await fs.readFile(resolvedPath,'utf-8');
    return JSON.parse(db);
}
export const saveDB=async(db)=>{
    await fs.writeFile(resolvedPath,JSON.stringify(db,null,2));

    return db;
}
export const insertDB=async(note)=>{
    const db=await getDB();
    db.notes.push(note);
    await saveDB(db);
    return note;
}