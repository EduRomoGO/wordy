Parsear y crear un listado de palabras sin duplicados
Buscar todas esas palabras y descargar todos los audios de dichas palabras
crear un listado con todas las palabras que han sido buscadas, para consultarlo a la hora de buscar nuevas palabras

o mejor aun, descargar el listado con las 5000 palabras mas usadas
Ir haciendo scrapping poco a poco de todas ellas (poner un delay de entre 23 - 30 segundos entre cada busqueda)
Una vez que tenga mi bbdd con los audios, crear la web con todas las palabras del siguiente modo

palabra - traduccion - audio - fonetica - [definicion]

para comprobar antes de buscar el audio si una palabra existe, buscar en html scrapeado el id 'noEntryFound', que significa que la palabra no ha sido encontrada en la bbdd

https://www.wordfrequency.info/free.asp?s=y


[x] Crear el proyecto
[x] Mapear cada palabra que quiera buscar, a su descriptor para descargar y almacenar las traducciones
    [x] Coger el codigo del scrapeo, y que para una palabra, me devuelva su url del audio
[x] Descargar algunos ficheros de audio de prueba
[x] Incluir en cada descriptor las definiciones? Si
[x] Para los ficheros de audio comprobar si ya existen en el fichero de audiofiles
[x] Hacer la comprobacion de que el elemento esta en la bbdd en el index, antes de asignar los timeouts
[x] Poner a descargar las palabras de mi CV
[x] Mover el codigo de scrap a mi libreria para no tener que modidifarlo en cada instalacion
[x] Comprobar que si la palabra no tiene traduccion no se genere el fichero de audio
[x] No almacenar en bbdd si no tiene definiciones
[x] Hacer que se vuelva a guardar la url del audio en el descriptor, me resulta util
[x] Hacer analisis de palabras que estan incorrectas y crear una via de escape para forzar a que se vuelvan a buscar esas palabras aunque ya esten en la bbdd para volver a regenerar su descriptor y su fichero de audio
[x] Borrar descriptores que no tengan definiciones
[x] Gestionar de alguna manera las palabras que no se van a almacenar en la bbdd como los plurales, para no procesarlos de nuevo
    [x] Crear otra coleccion en la bbdd con estos items para consultar que si estan ahi ya no se procesen
[x] Tratar de borrar los plurales de la lista de los 20k words
[x] Mejorar ligeramente los logs
[x] Descargar de --> http://cambridgeenglishonline.com/interactive_phonemic_chart/ los sonidos foneticos y palabras de ejemplo de cada uno de ellos (img de 0001 a 0044)
simbolos foneticos --> http://cambridgeenglishonline.com/interactive_phonemic_chart/snd/sym/img_0024.mp3
palabras de ejemplo --> http://cambridgeenglishonline.com/interactive_phonemic_chart/snd/word/img_0024.mp3
[x] Usar esta pagina --> https://tophonetics.com/ para recuperar la fonetica de los plurales y de los que no tienen en mi bbdd --> No he podido encontrar la fuente del audio
    [x] poner boton para borrar busqueda
    [x] Eliminar signos de puntuacion y numeros, es decir, todo lo que no sean letras
    [x] Crear boton que te lea todo del tiron
    [x] hacer paginado
    [x] Apuntar todas las palabras que busque y no encuentre para buscarlas luego en https://tophonetics.com/

[ ] Coger listado de los nombres del repo https://github.com/smashew/NameDatabases/blob/master/NamesDatabases/first%20names/us.txt
    [ ] Al hacer analisis con dbAnalysis, quitar las palabras erroneas que sean nombres
- [ ] Buscar los plurales en https://www.wordsapi.com/
  - [ ] Sacar su definicion
  - [ ] Sacar su fonetica
- [ ] Consultar la frecuencia de las palabras en https://www.wordsapi.com/
- [ ] Ordenar las palabras por frecuencia

[ ] Concern: hasta cuanto puede crecer la bbdd
    [ ] Posibles soluciones, agrupar los ficheros de la bbdd de 500 en 500 palabras. Cuando llegue a esas palabras, lo almaceno el fichero, y creo otro. Problema: podria haber duplicados entre los distintos ficheros, pero no es tan importante
[ ] Concern: al estar almacenando en el descriptor de la bbdd la url de wr, no se si podria tener problemas legales
[ ] Ir poco a poco generando la bbdd de todas las palabras


const saveDescriptorToDb = descriptor => {
    // Update
    db.get('wordDescriptors')
        .find({ word: descriptor.word })
        .assign(descriptor)
        .write()
    
    // Create
    // db.get('wordDescriptors')
    //     .push(descriptor)
    //     .write();
};
