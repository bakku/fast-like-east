package dev.bakku.fastlikeeast.scraper

import org.junit.jupiter.api.assertThrows
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertTrue

class MockFastingHttpClient(private val response: FastingHttpResponse) : FastingHttpClient {
    override fun getHtmlForMonth(month: Int, year: Int): FastingHttpResponse {
        return response
    }
}

class FastingDaysScraperTests {
    @Test
    fun testGetFastingDaysShouldReturnCorrectFastingDays() {
        val testHtml = this::javaClass::class.java.getResource("/test.html")!!.readText()

        val scraper = FastingDaysScraper(MockFastingHttpClient(FastingHttpResponse(200, testHtml)))
        val fastingDays = scraper.getFastingDays(2, 2022)

        assertEquals(7, fastingDays.size)

        assertEquals(4, fastingDays.count { it.type == FastingType.STRICT })
        assertEquals(1, fastingDays.count { it.type == FastingType.FISH })
        assertEquals(1, fastingDays.count { it.type == FastingType.CHEESE })
        assertEquals(1, fastingDays.count { it.type == FastingType.WINE })

        assertNotNull(fastingDays.find { it.date == "2022-02-02" && it.type == FastingType.FISH })
        assertNotNull(fastingDays.find { it.date == "2022-02-04" && it.type == FastingType.STRICT })
        assertNotNull(fastingDays.find { it.date == "2022-02-09" && it.type == FastingType.STRICT })
        assertNotNull(fastingDays.find { it.date == "2022-02-11" && it.type == FastingType.WINE })
        assertNotNull(fastingDays.find { it.date == "2022-02-23" && it.type == FastingType.STRICT })
        assertNotNull(fastingDays.find { it.date == "2022-02-25" && it.type == FastingType.STRICT })
        assertNotNull(fastingDays.find { it.date == "2022-02-28" && it.type == FastingType.CHEESE })
    }

    @Test
    fun testGetFastingDaysShouldReturnCorrectFastingDaysIfNotAllTypesArePresentForTheMonth() {
        val testHtml = this::javaClass::class.java.getResource("/test_missing_fasting_types.html")!!.readText()

        val scraper = FastingDaysScraper(MockFastingHttpClient(FastingHttpResponse(200, testHtml)))
        val fastingDays = scraper.getFastingDays(1, 2022)

        assertEquals(8, fastingDays.size)
    }

    @Test
    fun testGetFastingDaysShouldRaiseAnExceptionIfFastingDaysCouldNotBeFetched() {
        val scraper = FastingDaysScraper(MockFastingHttpClient(FastingHttpResponse(500, "")))

        assertThrows<FastingDaysScraperException> {
            scraper.getFastingDays(2, 2022)
        }
    }
}