function generateHTML(teamstr) {
  return `<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Team Generator</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.8.0/css/bulma.css" />
        <script src="https://kit.fontawesome.com/5d7d532771.js" crossorigin="anonymous"></script>
    </head>

    <body>
        <style>
            #heroBody {
            background-color: #122B3F;
            }

            #heroTitle {
            color: #F8FAFC;
            }

            #heroSub {
            color: #F8FAFC;
            }
            .card{
                color: #122B3F
            }
            .header{
                background-color: #8EABBB;
            }
            .footer {
                background-color: #8EABBB;
            color: #122B3F;
            }
        </style>

        <!-- page title start -->
        <section class="hero is-medium is-dark has-text-centered">
            <div class="hero-body" id="heroBody">
                <div class="container">
                    <h1 class="title is-1" id="heroTitle">
                        My Team
                    </h1>
                </div>
            </div>
        </section>
        <!-- page title end -->

        <!-- team section start -->
        <section class="section">
            <div class="container">

                <!-- team content start -->
                <div class="columns is-multiline">
                        ${teamstr}
                </div>
                <!-- team content end -->
            </div>
        </section>
        <!-- team section end -->



        <!-- footer start -->
        <footer class="footer">
            <div class="container has-text-centered" id="footerContent">
                <p>Christopher Ellis</p><i class="fa fa-copyright    "> 2020</i>
            </div>
        </footer>
        <!-- footer end -->
    </body>

</html>`;
}

exports.generateHTML = generateHTML;
