import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { removeAllNotes,removeNote,findNotes,getAllNotes,newNote } from "./notes.js";
import { listNotes } from "./utils.js";

yargs(hideBin(process.argv))
  .command('new <note>', 'Create a new note', (yargs) => {
    return yargs.positional('note',{
        type:'string',
        description:'The content of the note'
  })
  }, 
  async(argv) => {
    const tags=argv.tags?argv.tags.split(','):[]
    const note= await newNote(argv.note,tags);
    console.log('new note:',note);
})
  .option('tags',{
    alias:'t',
    type:'string',
    description:'tags to add to the note'
  })
  .command('all', 'get all notes', () =>{}, 
  async(argv) => {
    const notes= await getAllNotes();
    listNotes(notes);

  })
  .command('find <filter>', 'get matching notes', (yargs) => {
    return yargs.positional('filter',{
        type:'string',
        describe:'The search keyword to filter all notes'
  })
  }, async(argv) => {
    const notes=await findNotes(argv.filter);
    listNotes(notes);
  })
  .command('remove <id>', 'remove a note by its id', (yargs) => {
    return yargs.positional('id',{
        type:'number',
        description:'The id of the note to delete'
  })
  }, async(argv) => {
    const id=await removeNote(argv.id);
    if(id){
        console.log('note removed',id);
    }
    else{
        console.log('note not found');
    }
  })
  .command('web [port]', 'launch websites to see the notes', (yargs) => {
    return yargs.positional('port',{
        type:'number',
        description:'port to bind on',
        default:5000

  })
  }, (argv) => {
    console.log(argv)
  })
  .command('clean', 'remove all notes', () => {}, async(argv) => {
    await removeAllNotes();
    console.log('all notes removed');
  })
  .demandCommand(1)
  .parse()