---
title: 架构基础知识
categories:
  - 前端架构
tags:
  - 前端架构
author:
  name: MJ
  link: https://github.com/easy-mj/ise-blog
---

# 1. 架构是如何产生的？

## 1.1 初始：无架构，前端代码内嵌到后端应用中。

案例：Java Spring Boot 实现的后端应用

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
@RestController
public class NoTemplateTableApplication {

    public static void main(String[] args) {
        SpringApplication.run(NoTemplateTableApplication.class, args);
    }

    @GetMapping("/")
    public String index() {
        // 假设从数据库或其他数据源获取的数据
        List<User> data = new ArrayList<>();
        data.add(new User(1, "Alice", 25));
        data.add(new User(2, "Bob", 30));
        data.add(new User(3, "Charlie", 35));

        StringBuilder html = new StringBuilder("<!DOCTYPE html><html><head><title>Data Table</title></head><body><h1>Data Table</h1><table border='1'>");
        html.append("<tr><th>ID</th><th>Name</th><th>Age</th></tr>");
        for (User item : data) {
            html.append("<tr><td>").append(item.getId()).append("</td><td>").append(item.getName()).append("</td><td>").append(item.getAge()).append("</td></tr>");
        }
        html.append("</table></body></html>");

        return html.toString();
    }
}

class User {
    private int id;
    private String name;
    private int age;

    public User(int id, String name, int age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }
}
```

整体的 JS 和 HTML 代码是融合在后端代码中的，所有的交互的功能是通过后端的代码实现的，数据也是通过后端注入的。

缺点：随着 JS 代码越来越多，交互上也越来越复杂，所以后来就有了一些后端架构，比如后端的 MVC 架构。

## 1.2 后端 MVC 架构：将视图层、数据层、控制层做分离

案例：Java Spring Boot 结合 Thymeleaf 模板引擎

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">

<head>
    <title>Data Table</title>
</head>

<body>
    <h1>Data Table</h1>
    <table border="1">
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
        </tr>
        <tr th:each="item : ${data}">
            <td th:text="${item.id}"></td>
            <td th:text="${item.name}"></td>
            <td th:text="${item.age}"></td>
        </tr>
    </table>
</body>

</html>
```

```java
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.List;

@Controller
public class TableController {

    @GetMapping("/")
    public String index(Model model) {
        // 假设从数据库获取到的数据
        List<User> data = new ArrayList<>();
        data.add(new User(1, "Alice", 25));
        data.add(new User(2, "Bob", 30));
        data.add(new User(3, "Charlie", 35));

        model.addAttribute("data", data);
        return "table.html";
    }
}

class User {
    private int id;
    private String name;
    private int age;

    public User(int id, String name, int age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }
}
```

将渲染体系从后端的服务体系中拆离出去，将视图层、数据层、控制层做分离，后端的服务集中在数据层和控制层两个部分，视图层交由 html 及一些其他的渲染模版引擎或者 JS 去处理。

缺点：重度依赖开发环境（前端调试的时候需要有后端的所有代码，安装所有依赖，然后从本地启动去调试，这个复杂度还是很高的），代码混淆严重。

随着慢慢的发展，前端的逻辑会越来越多，如果所有的内容都集中在后端的环境里，那么必然会对整体的开发造成很大的影响，接下来就出现了前后端分离架构。

## 1.3 前后端分离架构：将前端代码从后端环境中分离出来（ajax 促进了前后端分离架构的发展）也就是常说的多页面架构

案例：基于 Java Spring Boot 结合 Ajax 实现

```java
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private int age;

    public User() {}

    public User(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
```

```java
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
```

```java
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<List<User>> getUsers() {
        List<User> users = userRepository.findAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
}
```

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>基于 Java Spring Boot 结合 Ajax 实现的前后端分离</title>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>

<body>
    <h1>用户信息列表</h1>
    <table border="1">
        <thead>
            <tr>
                <th>ID</th>
                <th>姓名</th>
                <th>年龄</th>
            </tr>
        </thead>
        <tbody id="userTableBody"></tbody>
    </table>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            // 发送AJAX请求获取用户数据
            axios.get('http://localhost:8080/api/users')
               .then(function (response) {
                    const users = response.data;
                    const tableBody = document.getElementById('userTableBody');
                    users.forEach(function (user) {
                        const row = document.createElement('tr');
                        const idCell = document.createElement('td');
                        const nameCell = document.createElement('td');
                        const ageCell = document.createElement('td');

                        idCell.textContent = user.id;
                        nameCell.textContent = user.name;
                        ageCell.textContent = user.age;

                        row.appendChild(idCell);
                        row.appendChild(nameCell);
                        row.appendChild(ageCell);

                        tableBody.appendChild(row);
                    });
                })
               .catch(function (error) {
                    console.error('请求出错:', error);
                });
        });
    </script>
</body>

</html>
```

缺点：前端缺乏独立部署能力，整体流程依赖后端环境

## 1.4 Node.js 的广泛应用促进了前端技术的飞速发展

- 各种打包、构建工具应运而生。
- 诞生了多元化前端开发方式，使得前端开发可以脱离整体后端环境。
- 出现了单页面架构

## 1.5 单页面架构

- 打包：gulp、rollup、webpack、vite......
- 框架：vue/react/angular/......
- UI 库：antd/iview/element-ui/mint-ui/......

优势：

- 切换页面浏览器无刷新，用户体验好
- 组件化的开发方式，极大的提升了代码的复用率和开发速度

劣势：

- 不利于 SEO，首次渲染会出现较长时间的白屏（可通过 SSR 等技术解决）

到目前为止，所有前端的内容还停留在浏览器阶段，主要还是写交互，有没有可能用 JS 去编写一些服务端逻辑，比如：连接数据库、做一些增删改查的操作、做一部分运维的工作，所以后期随着前端的发展，进入到了大前端时代。

## 1.6 大前端时代

- 后端框架：Express、Koa 等等
- 包管理工具：npm/yarn/pnpm 等等
- node 版本管理：nvm

弊端：

- 过于灵活的实现也导致了前端应用拆分过多，维护困难
- 往往一个功能或需求会跨越两三个项目进行开发

## 1.7 微前端等新型架构

优势：

- 技术栈无关（可以使用 Vue/React/Angular/jQuery/原生等等）
- 主框架不限制接入应用的技术栈，微应用具备完全的自主权（框架、依赖自主控制）
- 独立开发、独立部署
- 增量升级
- 微前端是一种非常好的实施*渐进式重构*的手段和策略
- 微应用仓库独立，前后端可独立开发，主框架自动完成同步更新
- 独立运行
- 每个微应用之间状态隔离，运行时状态不共享

劣势：

- 接入难度较高
- 应用场景：移动端少、管理端多
