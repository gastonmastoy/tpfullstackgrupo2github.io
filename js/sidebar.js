const sidebarBox = document.querySelector("#caja"),
	sidebarBtn = document.querySelector("#btn"),
	pageSidebar = document.querySelector("#page-sidebar");

sidebarBtn.addEventListener("click", (event) => {
	sidebarBtn.classList.toggle("active");
	sidebarBox.classList.toggle("active");
});

pageSidebar.addEventListener("click", (event) => {
	if (sidebarBox.classList.contains("active")) {
		sidebarBtn.classList.remove("active");
		sidebarBox.classList.remove("active");
	}
});

window.addEventListener("keydown", (event) => {
	if (sidebarBox.classList.contains("active") && event.keyCode === 27) {
		sidebarBtn.classList.remove("active");
		sidebarBox.classList.remove("active");
	}
});