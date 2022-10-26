#!/bin/bash
#ps -eo %cpu,pid,comm,user,nice,time,cmd
#aceptar un parametro en bash


ps -eo %cpu,%mem,pid,comm,user,nice,vsz,rss,stat,start,time,cmd 

#crear new archivo
#nombre y una descripcion

#for (let i = 0; i <= description.length; i**){
#
# }

#tambien muestre la uso de memoria
#ps -o pid,ppid,user,%cpu,%mem,vsz,rss,stat,start,time,command

#ps -eo %mem,pid,comm,user,nice,time,cmd

# imprimer tambien el quantum de tiempo que tiene cada proceso

#ps -eo %cpu,%mem,pid,comm,user,nice,time,cmd
#agregar el quantum de tiempo

#ps -eo %cpu,%mem,pid,comm,user,nice,time,cmd | sort -k 1 -r | head -n 10
