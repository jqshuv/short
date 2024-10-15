<!--
 Copyright (c) 2024 Joshua Schmitt

 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->

<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/jqshuv/short">
    <img src=".github/assets/short-logo-bordered.svg" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">short.</h3>

  <p align="center">
    Short is a lightweight and simple link shortener working on Cloudflare Workers.
    <br />
    <a href="https://github.com/jqshuv/short"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/jqshuv/short">View Demo</a>
    ·
    <a href="https://github.com/jqshuv/short/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/jqshuv/short/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

The goal of this project is to create a lightweight and simple url shortener that simply runs on Cloudflare Workers and is deployed by GitHub Actions. It uses the native Cloudflare Workers SDK without any additional packreges to be as minimal and cheap as possible. Short provides a simple API to create and manage new links.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![Next][Next.js]][Next-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an explanation of how you can get your own instance of short up and running.

### Prerequisites

Before you get started, you need to have a few things ready:

* [Fork](https://github.com/jqshuv/short/fork) the repository to your own account **with all branches**.

  > [!CAUTION]
  > **Unselect** "Copy the `main` branch only" else you will only be able to use the development version.
* A Cloudflare API Key with the necessary permissions to create and manage workers.
  * Follow the instructions [here](https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/#api-token) to get your API Key.
* A Cloudflare KV Namespace to store the links.
  * Follow the instructions [here](https://developers.cloudflare.com/kv/get-started/#2-create-a-kv-namespace) to create a new KV Namespace. (Recommended: Select Dashboard in the documentation)


### Deployment


> [!IMPORTANT]
> It is mandatory to follow the following steps to ensure that a stable version is deployed. If you want to deploy the development version, you can do so by selecting the `main` branch in the workflow.

1. Create following secrets in your forked repository: (Settings > Secrets and variables > New Repository Secret)
   * `CF_API_TOKEN` - Your Cloudflare API Token
   * `CF_KV_ID` - Your Cloudflare KV Namespace ID
     * To get your KV Namespace ID, go to your Cloudflare Dashboard, select your KV Namespace and copy the which is next to the name in the top left.
   * `SHORT_API_KEY` - Recommended: A random string if you want to secure your API.
2. Activate GitHub Actions in your repository.
   1. Go to the `Actions` tab in your repository.
   2. Click on the green button `I understand my workflows, go ahead and enable them` to enable GitHub Actions.
3. Run the workflow `🚀 Deploy`.
   1. On your repository page, click on the `Actions` tab.
   2. Click on the `🚀 Deploy` workflow on the left side.
   3. Click on the `Run workflow` button on the right side.
      1. Click on the `Branch: main` dropdown.
      2. Select the menu `Tags` in the dropdown.
      3. Select the latest tag. (The highest in the list)
   4. Run the workflow by clicking the green `Run workflow` button.

#### 🚀 All done! How simple huh? Now you can see your worker active [here](https://dash.cloudflare.com/?to=/:account/workers-and-pages) in your Cloudflare dashboard.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3
    - [ ] Nested Feature

See the [open issues](https://github.com/jqshuv/short/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Top contributors:

<a href="https://github.com/jqshuv/short/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=jqshuv/short" alt="contrib.rocks image" />
</a>



<!-- LICENSE -->
## License

Distributed under the MIT License. See [`LICENSE`](https://github.com/jqshuv/short/blob/main/LICENSE) for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Joshua Schmitt - [@jqshuv](https://github.com/jqshuv) - me@jqshuv.com

Project Link: [https://github.com/jqshuv/short](https://github.com/jqshuv/short)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* []()
* []()
* []()

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/jqshuv/short.svg?style=for-the-badge
[contributors-url]: https://github.com/jqshuv/short/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/jqshuv/short.svg?style=for-the-badge
[forks-url]: https://github.com/jqshuv/short/network/members
[stars-shield]: https://img.shields.io/github/stars/jqshuv/short.svg?style=for-the-badge
[stars-url]: https://github.com/jqshuv/short/stargazers
[issues-shield]: https://img.shields.io/github/issues/jqshuv/short.svg?style=for-the-badge
[issues-url]: https://github.com/jqshuv/short/issues
[license-shield]: https://img.shields.io/github/license/jqshuv/short.svg?style=for-the-badge
[license-url]: https://github.com/jqshuv/short/blob/master/LICENSE.txt
[product-screenshot]: .github/assets/short-banner.svg
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/

