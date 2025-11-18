# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - navigation [ref=e2]:
    - generic [ref=e4]:
      - link "NES" [ref=e5] [cursor=pointer]:
        - /url: /
        - img [ref=e6]
        - text: NES
      - generic [ref=e8]:
        - link "Dashboard" [ref=e9] [cursor=pointer]:
          - /url: /
          - img [ref=e10]
          - text: Dashboard
        - link "Projects" [ref=e12] [cursor=pointer]:
          - /url: /projects
          - img [ref=e13]
          - text: Projects
  - main [ref=e15]:
    - generic [ref=e17]:
      - generic [ref=e19]:
        - generic [ref=e20]:
          - heading "Project 1" [level=1] [ref=e21]
          - paragraph
        - button "Back" [ref=e22] [cursor=pointer]
      - generic [ref=e24]:
        - generic [ref=e25]:
          - heading "Description" [level=2] [ref=e26]
          - paragraph [ref=e27]: Description for project 1
        - generic [ref=e29]:
          - heading "Progress" [level=2] [ref=e30]
          - generic [ref=e31]: 50%
        - generic [ref=e34]:
          - button "Edit Project" [ref=e35] [cursor=pointer]
          - button "Delete" [ref=e36] [cursor=pointer]
  - button "Open Next.js Dev Tools" [ref=e42] [cursor=pointer]:
    - img [ref=e43]
  - alert [ref=e46]
```