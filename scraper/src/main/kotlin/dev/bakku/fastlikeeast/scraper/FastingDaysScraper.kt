package dev.bakku.fastlikeeast.scraper

import it.skrape.core.htmlDocument
import it.skrape.selects.eachText
import java.net.URI
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse

data class FastingHttpResponse(val code: Int, val html: String)
interface FastingHttpClient {
    fun getHtmlForMonth(month: Int, year: Int): FastingHttpResponse
}

class DefaultFastingHttpClient : FastingHttpClient {
    private val baseUrl = "https://www.goarch.org/chapel/calendar?month=%d&year=%d"
    private val client = HttpClient.newHttpClient()

    override fun getHtmlForMonth(month: Int, year: Int): FastingHttpResponse {
        val request = HttpRequest.newBuilder(URI.create(baseUrl.format(month, year)))
            .build()

        val response = client.send(request, HttpResponse.BodyHandlers.ofString())

        return FastingHttpResponse(response.statusCode(), response.body())
    }
}

class FastingDaysScraperException(message: String) : Exception(message)

class FastingDaysScraper(private val client: FastingHttpClient) {
    private val fastingTypeClassMapping = mapOf(
        FastingType.CHEESE to "fast-day",
        FastingType.FISH to "fasting-fish",
        FastingType.WINE to "grapes",
        FastingType.STRICT to "strict-fast"
    )

    fun getFastingDays(month: Int, year: Int): List<FastingDay> {
        val response = client.getHtmlForMonth(month, year)

        if (response.code != 200) throw FastingDaysScraperException(httpRequestFailedMessage(response.code, response.html))

        return listOf(FastingType.CHEESE, FastingType.FISH, FastingType.WINE, FastingType.STRICT)
            .flatMap { getFastingDays(response.html, it, month, year) }
    }

    private fun getFastingDays(html: String, fastingType: FastingType, month: Int, year: Int): List<FastingDay> {
        val days = htmlDocument(html) {
            relaxed = true
            
            findAll("div.${fastingTypeClassMapping[fastingType]} span[class='date']:not(.mobile)") {
                eachText
            }
        }

        return days.map { FastingDay("$year-${zeroPad(month.toString())}-${zeroPad(it)}", fastingType) }
    }

    private fun zeroPad(day: String): String {
        return if (day.length == 1) "0$day"
        else day
    }

    private fun httpRequestFailedMessage(code: Int, body: String): String {
        return  "Exception occurred while fetching fasting days: status code=${code}, body=${body}"
    }
}