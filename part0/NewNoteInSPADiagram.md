```mermaid
sequenceDiagram
    participant browser
    participant server

    Note over browser: New form submitted
    Note over browser: Page updated with new note
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note over server: note added to the array
    server-->>browser: 201 Created  {"message":"note created"}
    deactivate server

```