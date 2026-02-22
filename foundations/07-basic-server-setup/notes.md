To-Do After Ubuntu Server Finishes Installing
1. Complete Ubuntu Installation

Finish setup wizard

Create username & password

Enable OpenSSH (if option appears)

Reboot VM properly

2. Verify Installation

Inside VM:

                uname -m

        Expected output:

            aarch64

Check:

lsb_release -a
3. Update System
sudo apt update
sudo apt upgrade -y
4. Install Basic Tools
sudo apt install git curl jq htop -y

Verify:

            git --version
            node --version   # if installing later
5. Setup SSH Access (Next Step)

Generate SSH key on Mac

Copy public key to server

Test SSH login

6. Mirror Local Structure on Server

Create:

        ~/work
        ~/notes
        ~/bin

Add at least one sample file.