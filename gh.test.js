let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(60000);
  await page.goto("https://github.com/team", { timeout: 60000 });
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual(
      "GitHub for teams · Build like the best teams on the planet · GitHub"
    );
  }, 60000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 60000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Get started with Team");
  }, 60000);
});

describe("Home", () => {
  test("go to the header", async () => {
    await page.goto("https://github.com/login");
    const signInTitle = await page.title();
    expect(signInTitle).toEqual("Sign in to GitHub · GitHub");
  }, 60000);

  test("pricing", async () => {
    await page.goto("https://github.com/pricing");
    const pricing = await page.title();
    expect(pricing).toEqual("Pricing · Plans for every developer · GitHub");
  }, 60000);

  test("The h1 header content on features page", async () => {
    await page.goto("https://github.com/features");
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual("Features | GitHub · GitHub");
  }, 60000);

  test("choosing the payment volume", async () => {
    await page.goto("https://github.com/pricing");
    const sel1 =
      "body > div.application-main > main > div.p-responsive.container-xl.text-center.mt-7.mt-md-8.mt-lg-9.mb-5.mb-lg-9 > div > div > div > label:nth-child(2)";
    await page.waitForSelector(sel1);
    await page.click(sel1);
    const sel2 =
      "body > div.application-main > main > div.position-relative > div.p-responsive.container-xl.text-center > div.d-lg-flex.flex-items-stretch.gutter-lg-condensed.text-center > div:nth-child(1) > div > div > div.px-3.pt-4.pb-3 > div.mt-2 > a";
    await page.waitForSelector(sel2);
    await page.click(sel2);
  }, 60000);
});
