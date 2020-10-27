import os
import sys

from os.path import isfile, join
from pathlib import Path



def print_help(f="COMMADN"):
    print("<HELP> %s" % f)
    for arg in sys.argv:
        print(arg)
    return

def pack_up(path):
    onlyfiles = [f for f in os.listdir(path) if isfile(join(path, f))]
    for file in onlyfiles:

        #save cuttent path
        current_path = path + "\\" + file
        ##########

        #Make file name and new path
        file = file.split(".")
        file_name = file.pop(len(file)-2) + "." + file.pop()
        file_path = "\\".join(file)
        new_path = path + "\\" + file_path + "\\" + file_name;
        ##########

        #Make path
        Path(path + "\\" + file_path).mkdir(parents=True, exist_ok=True)
        ##########

        print("Move %s to %s" % (current_path,new_path))
        os.rename(current_path,new_path)
        


    return;

def pack_down(path):
    for root, dirs, files in os.walk(path, topdown=False):
        for name in files:

            f = os.path.join(root, name)
            new_name = f.replace(path + "\\","")
            new_name = new_name.replace("\\",".")
            new_name = path + "\\" + new_name

            print("Move %s to %s" % (f, new_name))
            os.rename(f, new_name)

    for root, dirs, files in os.walk(path, topdown=False):
        for name in dirs:
            name = root + "\\" + name

            print("Removing %s" % name)
            os.rmdir(name);


    return;

if __name__ == "__main__":
    print("<START>")

    if(len(sys.argv) != 3):
        print_help()
        exit(1);

    if(not os.path.isdir(sys.argv[2])):
        print_help("Path")
        exit(1)
    else:
        sys.argv[2] = os.path.abspath(sys.argv[2])

    if(not sys.argv[1].upper() in ("UP","DOWN")):
        print_help()
        exit(1)

    if(sys.argv[1].upper() == "UP"):
        pack_up(sys.argv[2])
    elif(sys.argv[1].upper() == "DOWN"):
        pack_down(sys.argv[2])

    pass
