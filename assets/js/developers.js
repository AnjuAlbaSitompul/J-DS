$(document).ready(function () {
	$.getJSON("/constants/developers.json", function (data) {
		const cards = data.map((dev, index) => {
			const delay = 0.2 + index * 0.1;
			const ig = dev.instagram.replace('@', '');
			return `
				<div class="col-lg-3 col-md-6 mb-4 wow animate__fadeInUp" data-wow-delay="${delay}s">
					<div class="vs-team vs-team--style2">
						<div class="vs-team__img">
							<img src="${dev.image}" alt="${dev.name}">
						</div>
						<div class="vs-team__content">
							<h3 class="vs-team__name">${dev.name}</h3>
							<span class="vs-team__instagram">${dev.instagram}</span>
						</div>
						<ul class="vs-team__share--list">
							<li>
								<a href="https://instagram.com/${ig}" target="_blank">
									<i class="fa-brands fa-instagram"></i>
								</a>
							</li>
						</ul>
					</div>
				</div>
			`;
		}).join("");
		$("#developers-list").html(cards);
	});
});
