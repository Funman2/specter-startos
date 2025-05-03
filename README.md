# Wrapper for Specter

Specter is a GUI for Bitcoin Core optimized to work with hardware wallets. This repository creates the `s9pk` package that is installed to run `specter` on [StartOS](https://github.com/Start9Labs/start-os/).

## 📢 Availability

This app is now available at the official **Start9 Community Marketplace**:  
🔗 [https://community-registry.start9.com/](https://community-registry.start9.com/) 

There you can install the prebuilt release package from the marketplace without building it. 

If you want to build Specter Wrapper yourself, follow these steps:


## Start9 Service Pre-Requisites

- [Bitcoin Core](https://github.com/Start9Labs/bitcoind-wrapper)

## Dependencies

To build this project, a properly configured environment is necessary. Start9 provides a comprehensive guide that ensures compatibility with the latest SDK:

🔗 **Recommended Guide**: [Start9 Packaging Docs](https://docs.start9.com/0.3.5.x/developer-docs/packaging)

## ✅ Build Environment (Ubuntu-based Quickstart)

1. **Install Docker**

```bash
curl -fsSL https://get.docker.com -o- | bash
sudo usermod -aG docker "$USER"
exec sudo su -l $USER
```

2. **Set buildx as the default builder**

```bash
docker buildx install
docker buildx create --use
```

3. **Enable cross-arch emulation**

```bash
docker run --privileged --rm linuxkit/binfmt:v0.8
```

4. **Install yq**

```bash
sudo snap install yq
```

5. **Install essential build packages**

```bash
sudo apt-get install -y build-essential openssl libssl-dev libc6-dev clang libclang-dev ca-certificates
```

6. **Install Rust & toml-cli**

```bash
curl https://sh.rustup.rs -sSf | sh
source $HOME/.cargo/env
cargo install toml-cli
```

7. **Install start-sdk**

```bash
git clone https://github.com/Start9Labs/start-os.git
cd start-os
make sdk
```

Then initialize:

```bash
start-sdk init
```

## Cloning the Project

Clone this repository and its submodules:

```bash
git clone https://github.com/Alex71btc/specter-startos.git
cd specter-startos
git submodule update --init --recursive
```

## Building

Simply run:

```bash
make
```

This will create `specter.s9pk`, the package for StartOS.

## 🛠️ Installing on StartOS

### 🔄 Method 1: Via the StartOS Web UI (Sideload)

1. In the StartOS web interface, go to:

   ```
   Settings → Sideload Service
   ```

2. Drag and drop the `specter.s9pk` file into the window, or select it manually.

3. Follow the on-screen instructions to complete the installation.

### 💻 Method 2: Using the Command Line (with `start-cli`)

> 📌 Make sure you have `start-cli` configured on your development machine.

1. Authenticate to your StartOS instance:

```bash
start-cli auth login
```

2. Sideload the `.s9pk` package:

```bash
start-cli service sideload ./specter.s9pk
```

3. Start the service:

```bash
start-cli service start specter
```

> 📦 **Note:** You can also sideload the `specter.s9pk` file through the StartOS web interface under **Settings → Sideload Service**.

## Verify Install

Go to your StartOS Services dashboard, select **Specter**, configure and start the service. Then, verify its interfaces are accessible.

---

🎉 Done!

## Support

🔹 **Wrapper Issues** (installation problems, StartOS integration, etc.):  
→ Open a [GitHub Issue](https://github.com/Alex71btc/specter-startos/issues) in this repository.

🔹 **Specter Desktop Issues** (wallet features, hardware wallet bugs, etc.):  
→ Report directly at [Specter Desktop GitHub](https://github.com/cryptoadvance/specter-desktop/issues).



