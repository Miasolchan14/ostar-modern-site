"use strict";

/* ==================================================
   1. 获取页面元素
================================================== */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

const serviceTabs = document.querySelectorAll(".service-tab");
const servicePanels = document.querySelectorAll(".service-panel");

const revealElements = document.querySelectorAll(".reveal");

const currentYear = document.getElementById("currentYear");


/* ==================================================
   2. 手机端导航菜单
================================================== */

if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
        const menuIsOpen = mainNav.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(menuIsOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            menuIsOpen ? "关闭导航菜单" : "打开导航菜单"
        );
    });


    /* 点击导航链接后关闭手机菜单 */

    const navigationLinks = mainNav.querySelectorAll("a");

    navigationLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            mainNav.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "打开导航菜单"
            );
        });
    });


    /* 按下 Esc 键关闭菜单 */

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            mainNav.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );
        }
    });


    /* 浏览器变宽后自动关闭手机菜单 */

    window.addEventListener("resize", function () {
        if (window.innerWidth > 830) {
            mainNav.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );
        }
    });
}


/* ==================================================
   3. 服务项目分类切换
================================================== */

serviceTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
        const targetPanelId = tab.dataset.tab;

        if (!targetPanelId) {
            return;
        }


        /* 取消所有按钮的选中状态 */

        serviceTabs.forEach(function (item) {
            item.classList.remove("active");

            item.setAttribute(
                "aria-selected",
                "false"
            );
        });


        /* 隐藏所有服务面板 */

        servicePanels.forEach(function (panel) {
            panel.classList.remove("active");
            panel.hidden = true;
        });


        /* 激活当前点击的按钮 */

        tab.classList.add("active");

        tab.setAttribute(
            "aria-selected",
            "true"
        );


        /* 显示对应的服务面板 */

        const targetPanel =
            document.getElementById(targetPanelId);

        if (targetPanel) {
            targetPanel.hidden = false;
            targetPanel.classList.add("active");
        }
    });
});


/* ==================================================
   4. 页面滚动进入动画
================================================== */

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );


    revealElements.forEach(function (element) {
        revealObserver.observe(element);
    });
} else {
    /* 旧浏览器无法使用动画时直接显示内容 */

    revealElements.forEach(function (element) {
        element.classList.add("visible");
    });
}


/* ==================================================
   5. 自动显示当前年份
================================================== */

if (currentYear) {
    currentYear.textContent =
        new Date().getFullYear();
}


/* ==================================================
   6. 导航栏当前区域高亮
================================================== */

const pageSections = document.querySelectorAll(
    "main section[id]"
);

const navigationLinks = document.querySelectorAll(
    '.main-nav a[href^="#"]'
);

function updateActiveNavigation() {
    let currentSectionId = "home";

    pageSections.forEach(function (section) {
        const sectionTop =
            section.offsetTop - 160;

        if (window.scrollY >= sectionTop) {
            currentSectionId = section.id;
        }
    });


    navigationLinks.forEach(function (link) {
        link.classList.remove("active");

        const linkTarget =
            link.getAttribute("href");

        if (linkTarget === "#" + currentSectionId) {
            link.classList.add("active");
        }
    });
}

window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);

updateActiveNavigation();