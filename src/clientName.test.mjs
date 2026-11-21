import assert from 'node:assert/strict';
import { test } from 'node:test';
import { browserClientName } from './clientName.ts';

test('identifies devices without confusing Android or ChromeOS with Linux', () => {
    const cases = [
        ['Mozilla/5.0 (Linux; Android 14)', 'Linux arm', 0, 'Android'],
        ['Mozilla/5.0 (X11; CrOS x86_64)', 'Linux x86_64', 0, 'ChromeOS'],
        ['Mozilla/5.0 (X11; Linux x86_64)', 'Linux x86_64', 0, 'Linux'],
        ['Mozilla/5.0 (Windows NT 10.0)', 'Win32', 0, 'Windows'],
        ['Mozilla/5.0 (Macintosh; Intel Mac OS X)', 'MacIntel', 0, 'macOS'],
        ['Mozilla/5.0 (iPhone; CPU iPhone OS)', 'iPhone', 5, 'iPhone'],
        ['Mozilla/5.0 (iPod; CPU iPhone OS)', 'iPod', 5, 'iPod'],
        ['Mozilla/5.0 (iPad; CPU OS)', 'iPad', 5, 'iPad'],
        ['Mozilla/5.0 (Macintosh; Intel Mac OS X)', 'MacIntel', 5, 'iPad'],
        ['', '', 0, 'Device']
    ];
    for (const [userAgent, platform, touchPoints, expected] of cases)
        assert.equal(browserClientName('12345678-abcd', userAgent, platform, touchPoints), `Snapweb ${expected} - 12345678`);
});

test('uses the existing client ID to distinguish browser profiles', () => {
    const name = browserClientName('12345678-aaaa', '', '', 0);
    assert.equal(browserClientName('12345678-aaaa', '', '', 0), name);
    assert.notEqual(browserClientName('87654321-bbbb', '', '', 0), name);
});
