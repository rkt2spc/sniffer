# sniffer

A WebExtension that sniff network traffics on browser and send them to a pre-configured server

## Dummy Server

### Requirements

- NodeJs (`brew install node`)

### Start

```sh
cd dummy-server
npm install
npm start
```

## Extension

### Installation

- Go to [chrome://extensions](chrome://extensions)
- Enable developer mode
- Load unpacked -> Choose the `dummy-server/extension` directory

### Notes

- Data is configured to be sent to [http://localhost:8080/records](http://localhost:8080/records) which is the ingest url of the dummy-server
- Data should be stored at `dummy-server/db.json` with default configurations
